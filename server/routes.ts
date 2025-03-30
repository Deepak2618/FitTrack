import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import {
  insertWorkoutSchema,
  insertExerciseSchema,
  insertActivitySchema, 
  insertBodyMeasurementSchema,
  insertStrengthProgressSchema,
  insertMealSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Workout routes
  app.get("/api/workouts", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const workouts = await storage.getWorkouts(req.user!.id);
      
      // For each workout, get its exercises
      const workoutsWithExercises = await Promise.all(
        workouts.map(async (workout) => {
          const exercises = await storage.getExercisesByWorkoutId(workout.id);
          return { ...workout, exercises };
        })
      );
      
      res.json(workoutsWithExercises);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workouts" });
    }
  });
  
  app.post("/api/workouts", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const workout = await storage.createWorkout(req.user!.id, req.body);
      const exercises = await storage.getExercisesByWorkoutId(workout.id);
      
      res.status(201).json({ ...workout, exercises });
    } catch (error) {
      res.status(500).json({ message: "Failed to create workout" });
    }
  });
  
  app.get("/api/workouts/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const workoutId = parseInt(req.params.id);
      const workout = await storage.getWorkoutById(workoutId);
      
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      
      // Check if the workout belongs to the authenticated user
      if (workout.userId !== req.user!.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const exercises = await storage.getExercisesByWorkoutId(workoutId);
      
      res.json({ ...workout, exercises });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workout" });
    }
  });
  
  app.delete("/api/workouts/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const workoutId = parseInt(req.params.id);
      const workout = await storage.getWorkoutById(workoutId);
      
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      
      // Check if the workout belongs to the authenticated user
      if (workout.userId !== req.user!.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      await storage.deleteWorkout(workoutId);
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete workout" });
    }
  });
  
  // Activity routes
  app.get("/api/activities", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const activities = await storage.getActivities(req.user!.id, limit);
      
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });
  
  app.post("/api/activities", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(req.user!.id, validatedData);
      
      res.status(201).json(activity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create activity" });
    }
  });
  
  // Body measurements routes
  app.get("/api/measurements", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const measurements = await storage.getBodyMeasurements(req.user!.id, limit);
      
      res.json(measurements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch measurements" });
    }
  });
  
  app.post("/api/measurements", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const validatedData = insertBodyMeasurementSchema.parse(req.body);
      const measurement = await storage.createBodyMeasurement(req.user!.id, validatedData);
      
      res.status(201).json(measurement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create measurement" });
    }
  });
  
  // Strength progress routes
  app.get("/api/strength", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const progress = await storage.getStrengthProgress(req.user!.id);
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch strength progress" });
    }
  });
  
  app.post("/api/strength", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const validatedData = insertStrengthProgressSchema.parse(req.body);
      const progress = await storage.createStrengthProgress(req.user!.id, validatedData);
      
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create strength progress" });
    }
  });
  
  // Meal routes
  app.get("/api/meals", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const meals = await storage.getMeals(req.user!.id, limit);
      
      res.json(meals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  });
  
  app.post("/api/meals", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const validatedData = insertMealSchema.parse(req.body);
      const meal = await storage.createMeal(req.user!.id, validatedData);
      
      res.status(201).json(meal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create meal" });
    }
  });
  
  // AI workout plan endpoint (mock)
  app.get("/api/ai/workout-plan", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const user = req.user!;
    
    // Only premium users can access this
    if (!user.isPremium) {
      return res.status(403).json({ message: "Premium subscription required" });
    }
    
    // Mock AI generated workout plan
    const aiWorkoutPlan = {
      name: "AI Custom Plan",
      description: "Personalized plan based on your goals and fitness level",
      workouts: [
        {
          name: "Upper Body Focus",
          dayOfWeek: "Monday",
          exercises: [
            { name: "Bench Press", sets: 4, reps: 10, weight: 60 },
            { name: "Shoulder Press", sets: 3, reps: 12, weight: 40 },
            { name: "Pull-ups", sets: 3, reps: 8, weight: 0 },
            { name: "Bicep Curls", sets: 3, reps: 12, weight: 15 }
          ]
        },
        {
          name: "Lower Body Focus",
          dayOfWeek: "Wednesday",
          exercises: [
            { name: "Squats", sets: 4, reps: 10, weight: 80 },
            { name: "Deadlifts", sets: 3, reps: 8, weight: 100 },
            { name: "Lunges", sets: 3, reps: 12, weight: 20 },
            { name: "Calf Raises", sets: 3, reps: 15, weight: 30 }
          ]
        },
        {
          name: "Full Body HIIT",
          dayOfWeek: "Friday",
          exercises: [
            { name: "Burpees", sets: 3, reps: 15, weight: 0 },
            { name: "Kettlebell Swings", sets: 3, reps: 15, weight: 16 },
            { name: "Mountain Climbers", sets: 3, reps: 20, weight: 0 },
            { name: "Plank", sets: 3, reps: 60, weight: 0 }
          ]
        }
      ]
    };
    
    res.json(aiWorkoutPlan);
  });
  
  // Weekly progress report endpoint (mock)
  app.get("/api/report/weekly", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const user = req.user!;
    
    // Only premium users can access this
    if (!user.isPremium) {
      return res.status(403).json({ message: "Premium subscription required" });
    }
    
    // Mock weekly report
    const weeklyReport = {
      week: "May 15 - May 21, 2023",
      summary: {
        workoutsCompleted: 3,
        totalCaloriesBurned: 1540,
        totalActiveMinutes: 135,
        averageSteps: 7850
      },
      achievements: [
        "Completed all scheduled workouts",
        "Increased bench press weight by 5kg",
        "Reached daily step goal 4 times"
      ],
      suggestions: [
        "Try to increase your water intake",
        "Consider adding one more cardio session",
        "Focus on improving squat form"
      ]
    };
    
    res.json(weeklyReport);
  });

  const httpServer = createServer(app);

  return httpServer;
}
