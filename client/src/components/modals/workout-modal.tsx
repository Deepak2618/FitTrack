import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

interface WorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  muscleGroup: z.string().optional(),
  sets: z.number().min(1, "Sets must be at least 1").optional(),
  reps: z.number().min(1, "Reps must be at least 1").optional(),
  weight: z.number().min(0, "Weight cannot be negative").optional(),
  restTime: z.number().min(0, "Rest time cannot be negative").optional(),
});

const workoutSchema = z.object({
  name: z.string().min(1, "Workout name is required"),
  dayOfWeek: z.string().optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute").optional(),
  exercises: z.array(exerciseSchema).min(1, "Add at least one exercise"),
});

type WorkoutFormValues = z.infer<typeof workoutSchema>;

export function WorkoutModal({ isOpen, onClose }: WorkoutModalProps) {
  const { toast } = useToast();
  
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      name: "",
      dayOfWeek: "",
      duration: 45,
      exercises: [{ name: "", muscleGroup: "", sets: 3, reps: 10, weight: 0, restTime: 60 }],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  });
  
  const createWorkoutMutation = useMutation({
    mutationFn: async (workout: WorkoutFormValues) => {
      const res = await apiRequest("POST", "/api/workouts", workout);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Workout created",
        description: "Your workout has been successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/workouts"] });
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create workout",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(values: WorkoutFormValues) {
    createWorkoutMutation.mutate(values);
  }
  
  function addExercise() {
    append({ name: "", muscleGroup: "", sets: 3, reps: 10, weight: 0, restTime: 60 });
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins font-bold text-2xl">Create Workout Plan</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workout Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Morning Strength Training" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <FormLabel className="text-base">Exercises</FormLabel>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="text-accent hover:text-accent/80 p-0"
                  onClick={addExercise}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Exercise
                </Button>
              </div>
              
              {fields.map((field, index) => (
                <div key={field.id} className="border dark:border-gray-700 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <FormField
                          control={form.control}
                          name={`exercises.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-gray-500 dark:text-gray-400">Exercise Name</FormLabel>
                              <FormControl>
                                <Input className="mt-1" placeholder="Barbell Squats" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`exercises.${index}.muscleGroup`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-gray-500 dark:text-gray-400">Muscle Group</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select muscle group" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="legs">Legs</SelectItem>
                                  <SelectItem value="chest">Chest</SelectItem>
                                  <SelectItem value="back">Back</SelectItem>
                                  <SelectItem value="shoulders">Shoulders</SelectItem>
                                  <SelectItem value="arms">Arms</SelectItem>
                                  <SelectItem value="core">Core</SelectItem>
                                  <SelectItem value="full_body">Full Body</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <FormField
                          control={form.control}
                          name={`exercises.${index}.sets`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-gray-500 dark:text-gray-400">Sets</FormLabel>
                              <FormControl>
                                <Input 
                                  className="mt-1" 
                                  type="number" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`exercises.${index}.reps`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-gray-500 dark:text-gray-400">Reps</FormLabel>
                              <FormControl>
                                <Input 
                                  className="mt-1" 
                                  type="number" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`exercises.${index}.weight`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-gray-500 dark:text-gray-400">Weight (kg)</FormLabel>
                              <FormControl>
                                <Input 
                                  className="mt-1" 
                                  type="number" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`exercises.${index}.restTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-gray-500 dark:text-gray-400">Rest (sec)</FormLabel>
                              <FormControl>
                                <Input 
                                  className="mt-1" 
                                  type="number" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (fields.length > 1) {
                          remove(index);
                        }
                      }}
                      className="ml-3 text-gray-400 hover:text-red-500"
                      disabled={fields.length <= 1}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dayOfWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day of Week</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={createWorkoutMutation.isPending}
            >
              {createWorkoutMutation.isPending ? "Saving..." : "Save Workout Plan"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
