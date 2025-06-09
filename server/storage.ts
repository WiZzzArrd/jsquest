import { users, progress, type User, type InsertUser, type Progress, type InsertProgress } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserProgress(userId: string): Promise<Progress[]>;
  updateProgress(progress: InsertProgress): Promise<Progress>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getUserProgress(userId: string): Promise<Progress[]> {
    return await db.select().from(progress).where(eq(progress.userId, userId));
  }

  async updateProgress(insertProgress: InsertProgress): Promise<Progress> {
    // Check if progress already exists for this user and level
    const [existing] = await db
      .select()
      .from(progress)
      .where(
        eq(progress.userId, insertProgress.userId)
      )
      .where(
        eq(progress.levelId, insertProgress.levelId)
      );

    if (existing) {
      // Update existing progress
      const [updated] = await db
        .update(progress)
        .set({
          completed: insertProgress.completed ?? false,
          score: insertProgress.score ?? 0
        })
        .where(eq(progress.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create new progress entry
      const [newProgress] = await db
        .insert(progress)
        .values({
          ...insertProgress,
          completed: insertProgress.completed ?? false,
          score: insertProgress.score ?? 0
        })
        .returning();
      return newProgress;
    }
  }
}

export const storage = new DatabaseStorage();
