import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  age: integer("age"),
  height: integer("height"),
  weight: integer("weight"),
  fitnessGoal: text("fitness_goal"),
  activityLevel: text("activity_level"),
  isPremium: boolean("is_premium").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  dayOfWeek: text("day_of_week"),
  duration: integer("duration"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id").notNull(),
  name: text("name").notNull(),
  muscleGroup: text("muscle_group"),
  sets: integer("sets"),
  reps: integer("reps"),
  weight: integer("weight"),
  restTime: integer("rest_time"),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // 'workout', 'steps', 'active_minutes', etc.
  value: integer("value").notNull(),
  calories: integer("calories"),
  date: timestamp("date").defaultNow(),
});

export const bodyMeasurements = pgTable("body_measurements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  weight: integer("weight"),
  bodyFat: integer("body_fat"),
  muscleMass: integer("muscle_mass"),
  chest: integer("chest"),
  waist: integer("waist"),
  hips: integer("hips"),
  biceps: integer("biceps"),
  thighs: integer("thighs"),
  calves: integer("calves"),
  date: timestamp("date").defaultNow(),
});

export const strengthProgress = pgTable("strength_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  exerciseName: text("exercise_name").notNull(),
  weight: integer("weight").notNull(),
  date: timestamp("date").defaultNow(),
});

export const meals = pgTable("meals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'breakfast', 'lunch', 'dinner', 'snack'
  calories: integer("calories").notNull(),
  date: timestamp("date").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  age: true,
  height: true,
  weight: true,
  fitnessGoal: true,
  activityLevel: true,
});

export const updateUserProfileSchema = createInsertSchema(users).pick({
  firstName: true,
  lastName: true,
  age: true,
  height: true,
  weight: true,
  fitnessGoal: true,
  activityLevel: true,
});

export const insertWorkoutSchema = createInsertSchema(workouts).pick({
  name: true,
  dayOfWeek: true,
  duration: true,
});

export const insertExerciseSchema = createInsertSchema(exercises).pick({
  name: true,
  muscleGroup: true,
  sets: true,
  reps: true,
  weight: true,
  restTime: true,
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  type: true,
  value: true,
  calories: true,
});

export const insertBodyMeasurementSchema = createInsertSchema(bodyMeasurements).omit({
  id: true,
  userId: true,
  date: true,
});

export const insertStrengthProgressSchema = createInsertSchema(strengthProgress).pick({
  exerciseName: true,
  weight: true,
});

export const insertMealSchema = createInsertSchema(meals).pick({
  name: true,
  type: true,
  calories: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type User = typeof users.$inferSelect;

export type InsertWorkout = z.infer<typeof insertWorkoutSchema> & { exercises: InsertExercise[] };
export type Workout = typeof workouts.$inferSelect;

export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type Exercise = typeof exercises.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

export type InsertBodyMeasurement = z.infer<typeof insertBodyMeasurementSchema>;
export type BodyMeasurement = typeof bodyMeasurements.$inferSelect;

export type InsertStrengthProgress = z.infer<typeof insertStrengthProgressSchema>;
export type StrengthProgress = typeof strengthProgress.$inferSelect;

export type InsertMeal = z.infer<typeof insertMealSchema>;
export type Meal = typeof meals.$inferSelect;
