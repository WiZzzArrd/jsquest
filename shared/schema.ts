import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  levelId: integer("level_id").notNull(),
  completed: boolean("completed").default(false),
  score: integer("score").default(0),
  attempts: integer("attempts").default(1),
  timeSpent: integer("time_spent").default(0), // in seconds
  hintsUsed: integer("hints_used").default(0),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const userDifficultyProfiles = pgTable("user_difficulty_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  currentDifficultyLevel: integer("current_difficulty_level").default(1), // 1-5 scale
  averageCompletionTime: integer("average_completion_time").default(0),
  averageAttempts: integer("average_attempts").default(1),
  successRate: integer("success_rate").default(100), // percentage
  adaptiveMultiplier: integer("adaptive_multiplier").default(100), // percentage, 100 = normal
  lastAdjustment: timestamp("last_adjustment").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
}).extend({
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  email: z.string().email("Некорректный email адрес"),
  username: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
});

export const loginSchema = z.object({
  email: z.string().email("Некорректный email адрес"),
  password: z.string().min(1, "Пароль обязателен"),
});

export const insertProgressSchema = createInsertSchema(progress).omit({
  id: true,
  completedAt: true,
});

export const insertDifficultyProfileSchema = createInsertSchema(userDifficultyProfiles).omit({
  id: true,
  lastAdjustment: true,
  updatedAt: true,
});

export const updateProgressSchema = createInsertSchema(progress).omit({
  id: true,
  userId: true,
  levelId: true,
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type User = typeof users.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type UserDifficultyProfile = typeof userDifficultyProfiles.$inferSelect;
export type InsertDifficultyProfile = z.infer<typeof insertDifficultyProfileSchema>;
export type UpdateProgress = z.infer<typeof updateProgressSchema>;
