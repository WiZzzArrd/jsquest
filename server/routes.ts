import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerUser, loginUser, getUserFromToken } from "./auth";
import { insertProgressSchema, updateProgressSchema } from "@shared/schema";

// Auth middleware
interface AuthRequest extends Request {
  userId?: number;
  user?: any;
}

const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.userId = undefined;
    return next();
  }

  try {
    const user = await getUserFromToken(token);
    req.userId = user.id;
    req.user = user;
    next();
  } catch (error) {
    req.userId = undefined;
    req.user = undefined;
    next();
  }
};

const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply auth middleware to all routes
  app.use(authenticateToken);

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const result = await registerUser(req.body);
      res.json(result);
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = await loginUser(req.body);
      res.json(result);
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(400).json({ message: error.message || "Login failed" });
    }
  });

  app.get("/api/auth/me", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUser(req.userId as number);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get user progress
  app.get("/api/progress", async (req: AuthRequest, res) => {
    try {
      let userId: number | string;
      
      if (req.userId) {
        // Authenticated user
        userId = req.userId;
      } else {
        // Anonymous user - fallback to string ID for compatibility
        userId = "anonymous";
        const progress = JSON.parse(req.headers['x-local-progress'] as string || '[]');
        return res.json(progress);
      }
      
      const progress = await storage.getUserProgress(userId as number);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Update progress
  app.post("/api/progress", requireAuth, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertProgressSchema.parse({
        ...req.body,
        userId: req.userId as number,
      });
      
      console.log('Saving progress for user:', req.userId, 'data:', validatedData);
      const progress = await storage.updateProgress(validatedData);
      res.json(progress);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  // Reset user progress
  app.delete("/api/progress", async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.json({ message: "Local progress reset" });
      }

      await storage.resetUserProgress(req.userId);
      res.json({ message: "Progress reset successfully" });
    } catch (error) {
      console.error("Error resetting progress:", error);
      res.status(500).json({ message: "Failed to reset progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
