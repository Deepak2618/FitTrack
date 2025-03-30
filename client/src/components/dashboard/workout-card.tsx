import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Timer } from "lucide-react";

interface WorkoutCardProps {
  workout: {
    id: number;
    name: string;
    dayOfWeek?: string;
    duration?: number;
    exercises: Array<{
      id: number;
      name: string;
      muscleGroup?: string;
      sets?: number;
      reps?: number;
    }>;
    createdAt: string;
  };
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  // Format workout time
  const getWorkoutTime = () => {
    if (!workout.createdAt) return "No time";
    
    const date = new Date(workout.createdAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    const timeString = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    if (isToday) {
      return `Today, ${timeString}`;
    } else if (isYesterday) {
      return `Yesterday, ${timeString}`;
    } else {
      return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${timeString}`;
    }
  };
  
  // Get the icon based on workout type
  const getWorkoutIcon = () => {
    // Basic logic to determine workout type based on available exercises
    const muscleGroups = workout.exercises
      .map(ex => ex.muscleGroup)
      .filter(Boolean);
    
    const uniqueGroups = [...new Set(muscleGroups)];
    
    if (uniqueGroups.includes('cardio') || uniqueGroups.includes('full_body')) {
      return (
        <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <path d="M18 7v14"></path>
            <path d="M18 18H4a2 2 0 0 0-2 2"></path>
            <path d="M18 18V3"></path>
            <path d="M22 3a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2z"></path>
            <path d="M13 7V3"></path>
          </svg>
        </div>
      );
    } else if (uniqueGroups.includes('legs') || uniqueGroups.includes('back')) {
      return (
        <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <path d="M4 20v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8"></path>
            <path d="M6 16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v6Z"></path>
            <path d="M10 12v1"></path>
            <path d="M14 12v1"></path>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4">
          <Dumbbell className="text-purple-500" />
        </div>
      );
    }
  };
  
  // Get muscle groups as badges
  const getMuscleGroupBadges = () => {
    const muscleGroups = workout.exercises
      .map(ex => ex.muscleGroup)
      .filter(Boolean);
    
    const uniqueGroups = [...new Set(muscleGroups)];
    
    return uniqueGroups.map((group, index) => (
      <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded mr-2 last:mr-0">
        {group?.charAt(0).toUpperCase() + group?.slice(1).replace('_', ' ')}
      </span>
    ));
  };

  return (
    <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:border-primary hover:shadow-sm">
      {getWorkoutIcon()}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">{workout.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getWorkoutTime()}
              {workout.duration && (
                <>
                  <span className="mx-1">•</span>
                  <span className="inline-flex items-center">
                    <Timer className="h-3 w-3 mr-1" />
                    {workout.duration} min
                  </span>
                </>
              )}
            </p>
          </div>
          <span className="bg-secondary/10 text-secondary text-xs font-medium px-2 py-1 rounded-full">
            Completed
          </span>
        </div>
        <div className="mt-2 flex items-center flex-wrap">
          {getMuscleGroupBadges()}
        </div>
      </div>
    </div>
  );
}
