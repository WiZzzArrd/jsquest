import { users, progress, type User, type InsertUser, type Progress, type InsertProgress } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserProgress(userId: string): Promise<Progress[]>;
  updateProgress(progress: InsertProgress): Promise<Progress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progress: Map<string, Progress>;
  private currentUserId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.progress = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserProgress(userId: string): Promise<Progress[]> {
    return Array.from(this.progress.values()).filter(
      (p) => p.userId === userId
    );
  }

  async updateProgress(insertProgress: InsertProgress): Promise<Progress> {
    const key = `${insertProgress.userId}-${insertProgress.levelId}`;
    const existing = this.progress.get(key);
    
    if (existing) {
      const updated = { ...existing, ...insertProgress };
      this.progress.set(key, updated);
      return updated;
    } else {
      const id = this.currentProgressId++;
      const newProgress: Progress = { ...insertProgress, id };
      this.progress.set(key, newProgress);
      return newProgress;
    }
  }
}

export const storage = new MemStorage();
