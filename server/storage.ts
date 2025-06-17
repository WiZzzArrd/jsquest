import { 
  users, 
  progress, 
  userDifficultyProfiles,
  type User, 
  type InsertUser, 
  type Progress, 
  type InsertProgress,
  type UserDifficultyProfile,
  type InsertDifficultyProfile,
  type UpdateProgress
} from "@shared/schema";
import { db } from "./db";
import { eq, and, avg, count, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserProgress(userId: number): Promise<Progress[]>;
  updateProgress(progress: InsertProgress): Promise<Progress>;
  resetUserProgress(userId: number): Promise<void>;
  
  // Adaptive difficulty methods
  getUserDifficultyProfile(userId: number): Promise<UserDifficultyProfile | undefined>;
  createOrUpdateDifficultyProfile(userId: number, profile: Partial<InsertDifficultyProfile>): Promise<UserDifficultyProfile>;
  updateProgressWithMetrics(userId: number, levelId: number, metrics: UpdateProgress): Promise<Progress>;
  calculateDifficultyAdjustment(userId: number): Promise<void>;
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

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserProgress(userId: number): Promise<Progress[]> {
    return await db.select().from(progress).where(eq(progress.userId, userId));
  }

  async updateProgress(insertProgress: InsertProgress): Promise<Progress> {
    // Check if progress already exists for this user and level
    const [existing] = await db
      .select()
      .from(progress)
      .where(
        and(
          eq(progress.userId, insertProgress.userId),
          eq(progress.levelId, insertProgress.levelId)
        )
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

  async resetUserProgress(userId: number): Promise<void> {
    await db.delete(progress).where(eq(progress.userId, userId));
  }

  // Adaptive difficulty methods
  async getUserDifficultyProfile(userId: number): Promise<UserDifficultyProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userDifficultyProfiles)
      .where(eq(userDifficultyProfiles.userId, userId));
    return profile || undefined;
  }

  async createOrUpdateDifficultyProfile(userId: number, profileData: Partial<InsertDifficultyProfile>): Promise<UserDifficultyProfile> {
    const existing = await this.getUserDifficultyProfile(userId);
    
    if (existing) {
      const [updated] = await db
        .update(userDifficultyProfiles)
        .set({
          ...profileData,
          updatedAt: new Date()
        })
        .where(eq(userDifficultyProfiles.userId, userId))
        .returning();
      return updated;
    } else {
      const [newProfile] = await db
        .insert(userDifficultyProfiles)
        .values({
          userId,
          ...profileData
        })
        .returning();
      return newProfile;
    }
  }

  async updateProgressWithMetrics(userId: number, levelId: number, metrics: UpdateProgress): Promise<Progress> {
    const existing = await db
      .select()
      .from(progress)
      .where(
        and(
          eq(progress.userId, userId),
          eq(progress.levelId, levelId)
        )
      );

    if (existing.length > 0) {
      const [updated] = await db
        .update(progress)
        .set({
          ...metrics,
          completedAt: new Date()
        })
        .where(eq(progress.id, existing[0].id))
        .returning();
      
      // Trigger difficulty adjustment calculation
      await this.calculateDifficultyAdjustment(userId);
      return updated;
    } else {
      const [newProgress] = await db
        .insert(progress)
        .values({
          userId,
          levelId,
          ...metrics,
          completed: metrics.completed ?? false,
          score: metrics.score ?? 0
        })
        .returning();
      
      // Trigger difficulty adjustment calculation
      await this.calculateDifficultyAdjustment(userId);
      return newProgress;
    }
  }

  async calculateDifficultyAdjustment(userId: number): Promise<void> {
    // Get user's recent performance data (last 10 completed levels)
    const recentProgress = await db
      .select()
      .from(progress)
      .where(and(
        eq(progress.userId, userId),
        eq(progress.completed, true)
      ))
      .orderBy(sql`${progress.completedAt} DESC`)
      .limit(10);

    if (recentProgress.length === 0) return;

    // Calculate performance metrics
    const totalAttempts = recentProgress.reduce((sum, p) => sum + (p.attempts || 1), 0);
    const totalTime = recentProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    const totalHints = recentProgress.reduce((sum, p) => sum + (p.hintsUsed || 0), 0);
    
    const avgAttempts = totalAttempts / recentProgress.length;
    const avgTime = totalTime / recentProgress.length;
    const avgHints = totalHints / recentProgress.length;
    
    // Success rate (levels completed on first try)
    const firstTrySuccess = recentProgress.filter(p => (p.attempts || 1) === 1).length;
    const successRate = (firstTrySuccess / recentProgress.length) * 100;

    // Determine difficulty adjustment
    let difficultyLevel = 1;
    let adaptiveMultiplier = 100;

    if (successRate >= 80 && avgAttempts <= 1.5 && avgHints <= 1) {
      // User is performing very well - increase difficulty
      difficultyLevel = 5;
      adaptiveMultiplier = 120; // 20% harder
    } else if (successRate >= 60 && avgAttempts <= 2 && avgHints <= 2) {
      // Good performance - slightly increase difficulty
      difficultyLevel = 4;
      adaptiveMultiplier = 110; // 10% harder
    } else if (successRate >= 40 && avgAttempts <= 3) {
      // Average performance - normal difficulty
      difficultyLevel = 3;
      adaptiveMultiplier = 100; // Normal
    } else if (successRate >= 20 && avgAttempts <= 5) {
      // Below average - slightly decrease difficulty
      difficultyLevel = 2;
      adaptiveMultiplier = 90; // 10% easier
    } else {
      // Poor performance - significantly decrease difficulty
      difficultyLevel = 1;
      adaptiveMultiplier = 80; // 20% easier
    }

    // Update or create difficulty profile
    await this.createOrUpdateDifficultyProfile(userId, {
      currentDifficultyLevel: difficultyLevel,
      averageCompletionTime: Math.round(avgTime),
      averageAttempts: Math.round(avgAttempts * 10) / 10, // Round to 1 decimal
      successRate: Math.round(successRate),
      adaptiveMultiplier
    });
  }
}

export const storage = new DatabaseStorage();
