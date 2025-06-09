import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  levelId: integer("level_id").notNull(),
  completed: boolean("completed").default(false),
  score: integer("score").default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProgressSchema = createInsertSchema(progress).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
