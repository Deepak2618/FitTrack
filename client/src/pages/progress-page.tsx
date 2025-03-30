import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout/main-layout";
import { ProgressChart } from "@/components/charts/progress-chart";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Crown, 
  ArrowDown, 
  ArrowUp, 
  Dumbbell,
  Plus,
  History,
  PenLine,
  ChartPie
} from "lucide-react";

export default function ProgressPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  // Get body measurements
  const { data: measurements } = useQuery({
    queryKey: ["/api/measurements"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch measurements");
      return response.json();
    },
  });
  
  // Get strength progress
  const { data: strengthProgress } = useQuery({
    queryKey: ["/api/strength"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch strength progress");
      return response.json();
    },
  });

  // Sample data for weight progress chart
  const weightData = [
    { date: "Feb", value: 78 },
    { date: "Mar", value: 76 },
    { date: "Apr", value: 74 },
    { date: "May", value: 72.5 },
  ];
  
  // Sample data for body fat progress chart
  const bodyFatData = [
    { date: "Feb", value: 22 },
    { date: "Mar", value: 20.5 },
    { date: "Apr", value: 19.2 },
    { date: "May", value: 18.4 },
  ];
  
  // Process strength progress data for chart display
  const getStrengthProgressByExercise = () => {
    if (!strengthProgress) return {};
    
    return strengthProgress.reduce((acc: Record<string, any[]>, item: any) => {
      if (!acc[item.exerciseName]) {
        acc[item.exerciseName] = [];
      }
      
      acc[item.exerciseName].push({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: item.weight,
        id: item.id
      });
      
      return acc;
    }, {});
  };
  
  const strengthProgressByExercise = getStrengthProgressByExercise();
  const strengthExercises = Object.keys(strengthProgressByExercise);
  
  // Calculate progress for each exercise
  const calculateProgress = (exerciseName: string) => {
    const exerciseData = strengthProgressByExercise[exerciseName];
    if (!exerciseData || exerciseData.length < 2) return { current: 0, start: 0, progress: 0 };
    
    const sortedData = [...exerciseData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const start = sortedData[0].weight;
    const current = sortedData[sortedData.length - 1].weight;
    const progress = current - start;
    const progressPercentage = (progress / start) * 100;
    
    return { current, start, progress, progressPercentage };
  };

  return (
    <MainLayout>
      {/* Subscription Modal */}
      <SubscriptionModal isOpen={showSubscriptionModal} onClose={() => setShowSubscriptionModal(false)} />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-poppins font-bold text-2xl md:text-3xl">My Progress</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Monthly</span>
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary to-accent"
              onClick={() => setShowSubscriptionModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="card">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Current Weight</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="font-poppins font-bold text-3xl">72.5</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">kg</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="h-4 w-4 text-secondary" />
                  <span className="text-secondary font-medium">-2.3</span>
                </div>
              </div>
              
              <div className="h-[80px]">
                <div className="h-full flex items-end">
                  <div className="w-full flex items-end justify-between">
                    {weightData.map((point, index) => (
                      <div key={index} className="h-full flex flex-col justify-end items-center">
                        <div 
                          className={`w-1 ${index === weightData.length - 1 
                            ? 'bg-accent' 
                            : index === weightData.length - 2 
                              ? 'bg-accent' 
                              : 'bg-gray-300 dark:bg-gray-600'}`
                          } 
                          style={{ height: `${(point.value / 80) * 100}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Body Fat %</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="font-poppins font-bold text-3xl">18.4</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">%</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="h-4 w-4 text-secondary" />
                  <span className="text-secondary font-medium">-1.2%</span>
                </div>
              </div>
              
              <div className="h-[80px]">
                <div className="h-full flex items-end">
                  <div className="w-full flex items-end justify-between">
                    {bodyFatData.map((point, index) => (
                      <div key={index} className="h-full flex flex-col justify-end items-center">
                        <div 
                          className={`w-1 ${index === bodyFatData.length - 1 
                            ? 'bg-accent' 
                            : index === bodyFatData.length - 2 
                              ? 'bg-accent' 
                              : 'bg-gray-300 dark:bg-gray-600'}`
                          } 
                          style={{ height: `${(point.value / 25) * 100}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-500 dark:text-gray-400">Muscle Mass</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="font-poppins font-bold text-3xl">32.8</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">kg</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-4 w-4 text-secondary" />
                  <span className="text-secondary font-medium">+0.8</span>
                </div>
              </div>
              
              <div className="h-[80px]">
                <div className="h-full flex items-end">
                  <div className="w-full flex items-end justify-between">
                    {[40, 43, 45, 48, 50, 52, 55].map((height, index) => (
                      <div key={index} className="h-full flex flex-col justify-end items-center">
                        <div 
                          className={`w-1 ${index >= 5 
                            ? 'bg-secondary' 
                            : 'bg-gray-300 dark:bg-gray-600'}`
                          } 
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Progress Chart */}
        <Card className="mb-8">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-poppins font-bold text-lg">Progress Tracking</h2>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  Weight
                </Button>
                <Button variant="ghost" className="text-sm font-medium text-accent px-2 py-1 rounded bg-accent/10">
                  Body Fat
                </Button>
                <Button variant="ghost" className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  Muscle
                </Button>
              </div>
            </div>
            
            {/* Progress Chart */}
            <div className="h-80">
              <ProgressChart 
                data={bodyFatData} 
                lineColor="#1E90FF" 
                yAxisLabel="Body Fat %" 
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Strength Progress & Measurements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strength Progress */}
          <Card>
            <CardContent className="p-5">
              <h2 className="font-poppins font-bold text-lg mb-5">Strength Progress</h2>
              
              <div className="space-y-4">
                {strengthExercises.length > 0 ? (
                  strengthExercises.map((exercise) => {
                    const { current, start, progress } = calculateProgress(exercise);
                    const progressPercentage = (progress && start) ? Math.round((progress / start) * 100) : 0;
                    
                    return (
                      <div key={exercise}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Dumbbell className="text-primary h-4 w-4 mr-2" />
                            <span className="font-medium">{exercise}</span>
                          </div>
                          <div className="font-bold">{current} kg</div>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full progress-bar" 
                            style={{ "--width": `${current / 150 * 100}%` } as React.CSSProperties}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Starting: {start} kg</span>
                          <span className="text-xs text-secondary">+{progress} kg</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No strength progress recorded yet.</p>
                  </div>
                )}
              </div>
              
              <Button variant="outline" className="w-full mt-5">
                <Plus className="mr-2 h-4 w-4" />
                <span>Add Exercise</span>
              </Button>
            </CardContent>
          </Card>
          
          {/* Body Measurements */}
          <Card>
            <CardContent className="p-5">
              <h2 className="font-poppins font-bold text-lg mb-5">Body Measurements</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Chest</h3>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-lg">98 cm</span>
                    <span className="text-secondary text-xs">+2 cm</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Waist</h3>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-lg">82 cm</span>
                    <span className="text-secondary text-xs">-3 cm</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Hips</h3>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-lg">94 cm</span>
                    <span className="text-secondary text-xs">-2 cm</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Biceps</h3>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-lg">36 cm</span>
                    <span className="text-secondary text-xs">+1.5 cm</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Thighs</h3>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-lg">58 cm</span>
                    <span className="text-secondary text-xs">+1 cm</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Calves</h3>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-lg">38 cm</span>
                    <span className="text-secondary text-xs">+0.5 cm</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <History className="mr-2 h-4 w-4" />
                  <span>History</span>
                </Button>
                <Button className="flex-1">
                  <PenLine className="mr-2 h-4 w-4" />
                  <span>Update</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Premium Reports */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-poppins font-bold text-lg">Weekly Reports</h2>
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
            <div className="flex flex-col items-center max-w-lg mx-auto text-center">
              <div className="bg-white dark:bg-gray-800 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <ChartPie className="text-accent text-xl" />
              </div>
              <h3 className="font-poppins font-bold text-xl mb-2">Unlock Advanced Progress Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-5">
                Get detailed weekly reports with performance insights, nutrition recommendations, and personalized improvement suggestions.
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
