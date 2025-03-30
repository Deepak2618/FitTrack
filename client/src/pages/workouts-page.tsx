import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout/main-layout";
import { WorkoutModal } from "@/components/modals/workout-modal";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  Dumbbell, 
  Plus, 
  Check,
  ArrowRight,
  PlayCircle,
  PenLine,
  Flame
} from "lucide-react";

export default function WorkoutsPage() {
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  // Fetch workouts
  const { data: workouts, isLoading } = useQuery({
    queryKey: ["/api/workouts"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch workouts");
      return response.json();
    },
  });

  // Helper function to get muscle group badge letters
  const getMuscleGroupShortName = (muscleGroup: string) => {
    const groupMap: Record<string, string> = {
      'chest': 'C',
      'back': 'B',
      'shoulders': 'S',
      'arms': 'A',
      'legs': 'L',
      'core': 'Co',
      'full_body': 'F'
    };
    return groupMap[muscleGroup] || muscleGroup[0].toUpperCase();
  };

  // Helper function to get background gradient by workout type
  const getWorkoutGradient = (index: number) => {
    const gradients = [
      'from-purple-500 to-primary',
      'from-green-500 to-teal-500',
      'from-accent to-blue-600',
      'from-primary to-orange-500',
      'from-purple-600 to-indigo-600'
    ];
    return gradients[index % gradients.length];
  };
  
  // Get all workouts organized by day
  const workoutsByDay = (workouts || []).reduce((acc: Record<string, any[]>, workout: any) => {
    const day = workout.dayOfWeek || 'unscheduled';
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(workout);
    return acc;
  }, {});

  // Order of days for weekly schedule
  const orderedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'unscheduled'];
  
  // Map days to display names
  const dayDisplayNames: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    unscheduled: 'Unscheduled'
  };

  return (
    <MainLayout>
      {/* Workout Modal */}
      <WorkoutModal isOpen={showWorkoutModal} onClose={() => setShowWorkoutModal(false)} />
      
      {/* Subscription Modal */}
      <SubscriptionModal isOpen={showSubscriptionModal} onClose={() => setShowSubscriptionModal(false)} />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-poppins font-bold text-2xl md:text-3xl">My Workouts</h1>
          <Button onClick={() => setShowWorkoutModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Workout</span>
          </Button>
        </div>
        
        {/* Weekly Schedule */}
        <Card className="mb-8">
          <CardContent className="p-5">
            <h2 className="font-poppins font-bold text-lg mb-5">Weekly Schedule</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {orderedDays.slice(0, 7).map((day, index) => {
                const dayWorkouts = workoutsByDay[day] || [];
                const date = new Date();
                date.setDate(date.getDate() - date.getDay() + index + 1);
                
                return (
                  <div key={day} className="border dark:border-gray-700 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="font-medium">{dayDisplayNames[day]}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-stretch">
                      {dayWorkouts.length > 0 ? (
                        dayWorkouts.map((workout: any) => (
                          <div 
                            key={workout.id}
                            className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mb-2 text-center"
                          >
                            <div className="text-purple-500 text-xs font-medium mb-1">
                              {workout.duration ? `${workout.duration} min` : 'Any time'}
                            </div>
                            <div className="font-medium text-sm">{workout.name}</div>
                          </div>
                        ))
                      ) : (
                        <div className="bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600/20 rounded-lg p-3 flex items-center justify-center min-h-[64px]">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Rest Day</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Saved Workout Plans */}
        <div className="mb-8">
          <h2 className="font-poppins font-bold text-lg mb-5">My Workout Plans</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-64 animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-24"></div>
                  <CardContent className="p-4">
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 w-2/3 mb-4 rounded"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-3 w-full mb-2 rounded"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-3 w-4/5 mb-2 rounded"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-3 w-3/4 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : workouts && workouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map((workout: any, index: number) => (
                <Card key={workout.id} className="overflow-hidden card">
                  <div className={`bg-gradient-to-r ${getWorkoutGradient(index)} p-4 text-white`}>
                    <h3 className="font-poppins font-bold text-lg">{workout.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm opacity-90">
                        {workout.duration ? `${workout.duration} min` : 'Any time'} • 
                        {workout.dayOfWeek ? ' ' + dayDisplayNames[workout.dayOfWeek] : ' Flexible'}
                      </span>
                      <div className="flex items-center">
                        <Flame className="mr-1 h-4 w-4" />
                        <span>{(workout.exercises.length * 80) + 40} kcal</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {Array.from(new Set(workout.exercises.map((ex: any) => ex.muscleGroup)))
                            .filter(Boolean)
                            .slice(0, 3)
                            .map((group: any, i: number) => (
                              <span 
                                key={i} 
                                className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs"
                              >
                                {getMuscleGroupShortName(group)}
                              </span>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Muscle Groups</span>
                      </div>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {workout.exercises.length} exercises
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {workout.exercises.slice(0, 4).map((exercise: any, i: number) => (
                        <div key={i} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Dumbbell className="text-purple-500 mr-2 text-sm h-4 w-4" />
                            <span className="text-sm">{exercise.name}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {exercise.sets && exercise.reps 
                              ? `${exercise.sets} × ${exercise.reps}` 
                              : exercise.sets 
                                ? `${exercise.sets} sets` 
                                : exercise.reps 
                                  ? `${exercise.reps} reps` 
                                  : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-2">
                      <Button variant="outline" className="flex-1">
                        <PenLine className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button className="flex-1">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border dark:border-gray-700 rounded-lg">
              <Dumbbell className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <h3 className="font-medium text-lg mb-2">No Workout Plans Yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create your first workout to start tracking your fitness journey
              </p>
              <Button onClick={() => setShowWorkoutModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Workout Plan
              </Button>
            </div>
          )}
        </div>
        
        {/* Premium Workout Plans */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-poppins font-bold text-lg">AI Generated Plans</h2>
            <Button
              variant="ghost"
              className="text-accent hover:text-accent/80 font-medium"
              onClick={() => setShowSubscriptionModal(true)}
            >
              <Crown className="mr-1 h-4 w-4" />
              <span>Premium Feature</span>
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-5 border border-accent/30">
            <div className="max-w-lg mx-auto text-center">
              <div className="bg-white dark:bg-gray-800 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="font-poppins font-bold text-xl mb-2">Get Personalized AI Workout Plans</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-5">
                Our AI analyzes your fitness level, goals, and available equipment to create custom workout routines tailored just for you.
              </p>
              <Button
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-lg hover:opacity-90"
                onClick={() => setShowSubscriptionModal(true)}
              >
                <Crown className="mr-2 h-4 w-4" />
                <span>Upgrade to Premium</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
