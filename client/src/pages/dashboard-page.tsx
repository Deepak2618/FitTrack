import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout/main-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { WorkoutCard } from "@/components/dashboard/workout-card";
import { ActivityChart } from "@/components/charts/activity-chart";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { WorkoutModal } from "@/components/modals/workout-modal";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { BarChart3, Dumbbell, Flame, Clock, Crown, Plus } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Fetch workouts
  const { data: workouts } = useQuery({
    queryKey: ["/api/workouts"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch workouts");
      return response.json();
    },
  });

  // Fetch activities
  const { data: activities } = useQuery({
    queryKey: ["/api/activities"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch activities");
      return response.json();
    },
  });

  // Formatted date for display
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Activity data for chart
  const weeklyActivityData = [
    { day: 'Mon', calories: 250, steps: 7000 },
    { day: 'Tue', calories: 400, steps: 8500 },
    { day: 'Wed', calories: 600, steps: 10000 },
    { day: 'Thu', calories: 800, steps: 11500 },
    { day: 'Fri', calories: 500, steps: 9000 },
    { day: 'Sat', calories: 700, steps: 8000 },
    { day: 'Sun', calories: 350, steps: 6000 },
  ];

  // Calculate total calories burned based on activities
  const totalCaloriesBurned = activities?.reduce((total: number, activity: any) => {
    return total + (activity.calories || 0);
  }, 0) || 0;

  // Get recent workouts
  const recentWorkouts = workouts?.slice(0, 3) || [];

  return (
    <MainLayout showHero={true}>
      {/* Workout Modal */}
      <WorkoutModal isOpen={showWorkoutModal} onClose={() => setShowWorkoutModal(false)} />
      
      {/* Subscription Modal */}
      <SubscriptionModal isOpen={showSubscriptionModal} onClose={() => setShowSubscriptionModal(false)} />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-poppins font-bold text-2xl md:text-3xl">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{formattedDate}</span>
            <Button variant="ghost" size="icon">
              <BarChart3 className="h-5 w-5 text-accent" />
            </Button>
          </div>
        </div>

        {/* Greeting & Summary Card */}
        <Card className="mb-8">
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="font-poppins font-bold text-xl md:text-2xl mb-1">
                  Good {getTimeOfDay()}, {user?.firstName || user?.username}!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  You have completed 70% of your weekly goal.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="bg-gray-100 dark:bg-gray-700">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Log Activity</span>
                </Button>
                <Button onClick={() => setShowWorkoutModal(true)} className="bg-primary">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  <span>New Workout</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Calories Burned"
            value={totalCaloriesBurned}
            change={{ value: "12.5%", isPositive: true }}
            goal="Weekly goal: 7,500 kcal"
            icon={<Flame className="h-5 w-5 text-primary" />}
            iconBgColor="bg-primary/10"
          />
          
          <StatsCard
            title="Steps"
            value="8,392"
            change={{ value: "3.7%", isPositive: true }}
            goal="Daily goal: 10,000 steps"
            icon={<svg className="h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5.5V18M19 9h-3M17 15h-6M5 5.5V18M5 9h3M7 15h6"/></svg>}
            iconBgColor="bg-accent/10"
          />
          
          <StatsCard
            title="Workouts"
            value={recentWorkouts.length}
            unit="this week"
            goal="Weekly goal: 5 workouts"
            icon={<Dumbbell className="h-5 w-5 text-purple-500" />}
            iconBgColor="bg-purple-500/10"
          />
          
          <StatsCard
            title="Active Minutes"
            value="87"
            change={{ value: "5.3%", isPositive: false }}
            goal="Daily goal: 60 minutes"
            icon={<Clock className="h-5 w-5 text-green-500" />}
            iconBgColor="bg-green-500/10"
          />
        </div>

        {/* Weekly Overview & Activity Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-poppins font-bold text-lg">Weekly Activity</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-primary"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Calories</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-accent"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Steps</span>
                    </div>
                  </div>
                </div>
                
                {/* Activity Chart */}
                <div className="h-64">
                  <ActivityChart data={weeklyActivityData} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Weekly Goal Progress */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-poppins font-bold text-lg mb-5">Weekly Goals</h3>
              
              <div className="space-y-5">
                <ProgressBar
                  value={1248}
                  max={7500}
                  label="Calories Burned"
                  sublabel="1,248 / 7,500"
                  color="bg-primary"
                />
                
                <ProgressBar
                  value={3}
                  max={5}
                  label="Workout Sessions"
                  sublabel="3 / 5"
                  color="bg-accent"
                />
                
                <ProgressBar
                  value={4}
                  max={6}
                  label="Active Days"
                  sublabel="4 / 6"
                  color="bg-secondary"
                />
                
                <ProgressBar
                  value={5}
                  max={8}
                  label="Water Intake"
                  sublabel="5 / 8 cups"
                  color="bg-blue-500"
                />
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Need help with your goals?</p>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent"
                  onClick={() => setShowSubscriptionModal(true)}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  <span>Get AI Workout Plan</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Workouts & Nutrition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Workouts */}
          <Card>
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-poppins font-bold text-lg">Recent Workouts</h3>
                <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentWorkouts.length > 0 ? (
                  recentWorkouts.map((workout: any) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <Dumbbell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>No recent workouts found.</p>
                    <p className="text-sm">Create your first workout plan!</p>
                  </div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-5 border-primary text-primary hover:bg-primary/10"
                onClick={() => setShowWorkoutModal(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                <span>Create New Workout</span>
              </Button>
            </CardContent>
          </Card>
          
          {/* Nutrition Overview */}
          <Card>
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-poppins font-bold text-lg">Today's Nutrition</h3>
                <Button variant="link" className="text-accent hover:text-accent/80 p-0">
                  View Details
                </Button>
              </div>
              
              {/* Calorie Chart */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-bold text-2xl">1,540</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">/2,200 kcal</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">70% of daily goal</span>
                </div>
                
                <ProgressBar value={1540} max={2200} color="bg-primary" />
              </div>
              
              {/* Macronutrients */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold mb-1">45%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Carbs</div>
                  <div className="text-sm font-medium">174g</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold mb-1">30%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Protein</div>
                  <div className="text-sm font-medium">116g</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold mb-1">25%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Fat</div>
                  <div className="text-sm font-medium">43g</div>
                </div>
              </div>
              
              {/* Recent Meals */}
              <h4 className="font-medium mb-3">Recent Meals</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
                        <line x1="6" x2="6" y1="2" y2="4"/>
                        <line x1="10" x2="10" y1="2" y2="4"/>
                        <line x1="14" x2="14" y1="2" y2="4"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">Breakfast</h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Oatmeal with berries</p>
                    </div>
                  </div>
                  <span className="font-medium text-sm">320 kcal</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
                        <path d="M7 2v20"/>
                        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">Lunch</h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Chicken salad</p>
                    </div>
                  </div>
                  <span className="font-medium text-sm">480 kcal</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                        <path d="M18 8a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8Z"/>
                        <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">Snack</h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Apple with protein bar</p>
                    </div>
                  </div>
                  <span className="font-medium text-sm">240 kcal</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-5">
                <Plus className="mr-2 h-4 w-4" />
                <span>Log Meal</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

// Helper function to get time of day greeting
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}
