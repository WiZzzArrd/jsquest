import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get user progress
  app.get("/api/progress", async (req, res) => {
    try {
      // For demo purposes, use anonymous user
      const userId = "anonymous";
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Update progress
  app.post("/api/progress", async (req, res) => {
    try {
      const validatedData = insertProgressSchema.parse(req.body);
      const progress = await storage.updateProgress(validatedData);
      res.json(progress);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
