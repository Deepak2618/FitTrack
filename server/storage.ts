import {
  users, workouts, exercises, activities, bodyMeasurements, strengthProgress, meals,
  type User, type InsertUser, type UpdateUserProfile,
  type Workout, type InsertWorkout,
  type Exercise, type InsertExercise,
  type Activity, type InsertActivity,
  type BodyMeasurement, type InsertBodyMeasurement,
  type StrengthProgress, type InsertStrengthProgress,
  type Meal, type InsertMeal
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(id: number, profile: UpdateUserProfile): Promise<User | undefined>;
  
  // Workout methods
  getWorkouts(userId: number): Promise<Workout[]>;
  getWorkoutById(id: number): Promise<Workout | undefined>;
  createWorkout(userId: number, workout: InsertWorkout): Promise<Workout>;
  deleteWorkout(id: number): Promise<void>;
  
  // Exercise methods
  getExercisesByWorkoutId(workoutId: number): Promise<Exercise[]>;
  createExercise(workoutId: number, exercise: InsertExercise): Promise<Exercise>;
  
  // Activity methods
  getActivities(userId: number, limit?: number): Promise<Activity[]>;
  createActivity(userId: number, activity: InsertActivity): Promise<Activity>;
  
  // Body measurements methods
  getBodyMeasurements(userId: number, limit?: number): Promise<BodyMeasurement[]>;
  createBodyMeasurement(userId: number, measurement: InsertBodyMeasurement): Promise<BodyMeasurement>;
  
  // Strength progress methods
  getStrengthProgress(userId: number): Promise<StrengthProgress[]>;
  createStrengthProgress(userId: number, progress: InsertStrengthProgress): Promise<StrengthProgress>;
  
  // Meal methods
  getMeals(userId: number, limit?: number): Promise<Meal[]>;
  createMeal(userId: number, meal: InsertMeal): Promise<Meal>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workouts: Map<number, Workout>;
  private exercises: Map<number, Exercise>;
  private activities: Map<number, Activity>;
  private bodyMeasurements: Map<number, BodyMeasurement>;
  private strengthProgress: Map<number, StrengthProgress>;
  private meals: Map<number, Meal>;
  
  sessionStore: session.SessionStore;
  
  currentUserId: number;
  currentWorkoutId: number;
  currentExerciseId: number;
  currentActivityId: number;
  currentBodyMeasurementId: number;
  currentStrengthProgressId: number;
  currentMealId: number;

  constructor() {
    this.users = new Map();
    this.workouts = new Map();
    this.exercises = new Map();
    this.activities = new Map();
    this.bodyMeasurements = new Map();
    this.strengthProgress = new Map();
    this.meals = new Map();
    
    this.currentUserId = 1;
    this.currentWorkoutId = 1;
    this.currentExerciseId = 1;
    this.currentActivityId = 1;
    this.currentBodyMeasurementId = 1;
    this.currentStrengthProgressId = 1;
    this.currentMealId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      isPremium: false, 
      createdAt
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserProfile(id: number, profile: UpdateUserProfile): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...profile };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Workout methods
  async getWorkouts(userId: number): Promise<Workout[]> {
    return Array.from(this.workouts.values()).filter(
      (workout) => workout.userId === userId
    );
  }
  
  async getWorkoutById(id: number): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }
  
  async createWorkout(userId: number, workout: InsertWorkout): Promise<Workout> {
    const id = this.currentWorkoutId++;
    const createdAt = new Date();
    const { exercises: workoutExercises, ...workoutData } = workout;
    
    const newWorkout: Workout = {
      ...workoutData,
      id,
      userId,
      createdAt
    };
    
    this.workouts.set(id, newWorkout);
    
    // Add exercises
    if (workoutExercises && workoutExercises.length > 0) {
      for (const exercise of workoutExercises) {
        await this.createExercise(id, exercise);
      }
    }
    
    return newWorkout;
  }
  
  async deleteWorkout(id: number): Promise<void> {
    // Delete exercises associated with the workout
    const workoutExercises = await this.getExercisesByWorkoutId(id);
    for (const exercise of workoutExercises) {
      this.exercises.delete(exercise.id);
    }
    
    // Delete the workout
    this.workouts.delete(id);
  }
  
  // Exercise methods
  async getExercisesByWorkoutId(workoutId: number): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(
      (exercise) => exercise.workoutId === workoutId
    );
  }
  
  async createExercise(workoutId: number, exercise: InsertExercise): Promise<Exercise> {
    const id = this.currentExerciseId++;
    
    const newExercise: Exercise = {
      ...exercise,
      id,
      workoutId
    };
    
    this.exercises.set(id, newExercise);
    return newExercise;
  }
  
  // Activity methods
  async getActivities(userId: number, limit?: number): Promise<Activity[]> {
    const activities = Array.from(this.activities.values())
      .filter((activity) => activity.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    if (limit) {
      return activities.slice(0, limit);
    }
    
    return activities;
  }
  
  async createActivity(userId: number, activity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const date = new Date();
    
    const newActivity: Activity = {
      ...activity,
      id,
      userId,
      date
    };
    
    this.activities.set(id, newActivity);
    return newActivity;
  }
  
  // Body measurements methods
  async getBodyMeasurements(userId: number, limit?: number): Promise<BodyMeasurement[]> {
    const measurements = Array.from(this.bodyMeasurements.values())
      .filter((measurement) => measurement.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    if (limit) {
      return measurements.slice(0, limit);
    }
    
    return measurements;
  }
  
  async createBodyMeasurement(userId: number, measurement: InsertBodyMeasurement): Promise<BodyMeasurement> {
    const id = this.currentBodyMeasurementId++;
    const date = new Date();
    
    const newMeasurement: BodyMeasurement = {
      ...measurement,
      id,
      userId,
      date
    };
    
    this.bodyMeasurements.set(id, newMeasurement);
    return newMeasurement;
  }
  
  // Strength progress methods
  async getStrengthProgress(userId: number): Promise<StrengthProgress[]> {
    return Array.from(this.strengthProgress.values())
      .filter((progress) => progress.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
  
  async createStrengthProgress(userId: number, progress: InsertStrengthProgress): Promise<StrengthProgress> {
    const id = this.currentStrengthProgressId++;
    const date = new Date();
    
    const newProgress: StrengthProgress = {
      ...progress,
      id,
      userId,
      date
    };
    
    this.strengthProgress.set(id, newProgress);
    return newProgress;
  }
  
  // Meal methods
  async getMeals(userId: number, limit?: number): Promise<Meal[]> {
    const meals = Array.from(this.meals.values())
      .filter((meal) => meal.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    if (limit) {
      return meals.slice(0, limit);
    }
    
    return meals;
  }
  
  async createMeal(userId: number, meal: InsertMeal): Promise<Meal> {
    const id = this.currentMealId++;
    const date = new Date();
    
    const newMeal: Meal = {
      ...meal,
      id,
      userId,
      date
    };
    
    this.meals.set(id, newMeal);
    return newMeal;
  }
}

export const storage = new MemStorage();
