// 
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false), 
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email"),
  phone: text("phone"),
  status: text("status").notNull(),
  notes: text("notes"),
  userId: integer("user_id").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email"),
  phone: text("phone"),
  userId: integer("user_id").notNull(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
  dueDate: timestamp("due_date"),
  userId: integer("user_id").notNull(),
});

// Schema validations
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  name: true,
  company: true,
  email: true,
  phone: true,
  status: true,
  notes: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  company: true,
  email: true,
  phone: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  title: true,
  description: true,
  dueDate: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;