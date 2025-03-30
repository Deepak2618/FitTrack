import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "@/components/layout/main-layout";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Coffee,
  Utensils,
  Apple,
  Calendar,
  ArrowLeft,
  ArrowRight,
  BarChart,
  Search,
  Filter,
  Crown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionModal } from "@/components/modals/subscription-modal";

export default function NutritionPage() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Fetch meals
  const { data: meals } = useQuery({
    queryKey: ["/api/meals"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0] as string, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch meals");
      return response.json();
    },
  });
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Navigate to previous/next day
  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };
  
  // Filter meals by type
  const getMealsByType = (type: string) => {
    if (!meals) return [];
    return meals.filter((meal: any) => meal.type === type);
  };
  
  // Group meals by date
  const getMealsByDate = (date: Date) => {
    if (!meals) return [];
    const dateString = date.toISOString().split('T')[0];
    return meals.filter((meal: any) => {
      const mealDate = new Date(meal.date).toISOString().split('T')[0];
      return mealDate === dateString;
    });
  };
  
  // Calculate total calories for the day
  const calculateTotalCalories = (date: Date) => {
    const dayMeals = getMealsByDate(date);
    return dayMeals.reduce((total: number, meal: any) => total + meal.calories, 0);
  };
  
  const totalCalories = calculateTotalCalories(selectedDate);
  const dailyCalorieGoal = 2200;
  const caloriesLeft = dailyCalorieGoal - totalCalories;
  
  // Mock nutrition data
  const nutritionData = {
    carbs: {
      grams: 174,
      percentage: 45,
      goal: 250
    },
    protein: {
      grams: 116,
      percentage: 30,
      goal: 120
    },
    fat: {
      grams: 43,
      percentage: 25,
      goal: 70
    }
  };
  
  // Mock meal suggestions
  const mealSuggestions = [
    { name: "Greek Yogurt with Berries", calories: 180, type: "breakfast" },
    { name: "Grilled Chicken Salad", calories: 350, type: "lunch" },
    { name: "Protein Smoothie", calories: 220, type: "snack" },
    { name: "Salmon with Roasted Vegetables", calories: 420, type: "dinner" }
  ];

  return (
    <MainLayout>
      {/* Subscription Modal */}
      <SubscriptionModal isOpen={showSubscriptionModal} onClose={() => setShowSubscriptionModal(false)} />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-poppins font-bold text-2xl md:text-3xl">Nutrition</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Meal Planner</span>
            </Button>
            <Button onClick={() => setShowSubscriptionModal(true)}>
              <Crown className="mr-2 h-4 w-4" />
              <span>Get Meal Plan</span>
            </Button>
          </div>
        </div>
        
        {/* Date Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigateDay('prev')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-medium">{formatDate(selectedDate)}</h2>
          <Button variant="ghost" size="icon" onClick={() => navigateDay('next')}>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Summary Card */}
        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Calories Overview */}
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-2">Calories</h3>
                <div className="flex items-baseline">
                  <span className="font-poppins font-bold text-3xl">{totalCalories.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">/ {dailyCalorieGoal.toLocaleString()} kcal</span>
                </div>
                <ProgressBar value={totalCalories} max={dailyCalorieGoal} className="mt-3" />
                <div className="mt-2 text-sm">
                  <span className="font-medium">{caloriesLeft > 0 ? caloriesLeft.toLocaleString() : 0} kcal</span>
                  <span className="text-gray-500 dark:text-gray-400"> left today</span>
                </div>
              </div>
              
              {/* Macronutrients Chart */}
              <div className="col-span-2">
                <h3 className="font-medium text-gray-500 dark:text-gray-400 mb-4">Macronutrients</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 relative">
                    <div className="absolute top-0 right-0 bg-blue-500/20 text-blue-500 rounded-bl-lg text-xs px-2 py-1">
                      {nutritionData.carbs.percentage}%
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-2xl font-bold">{nutritionData.carbs.grams}g</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Carbs</div>
                      <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-600 rounded">
                        <div 
                          className="h-full bg-blue-500 rounded" 
                          style={{ width: `${(nutritionData.carbs.grams / nutritionData.carbs.goal) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Goal: {nutritionData.carbs.goal}g
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 relative">
                    <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-500 rounded-bl-lg text-xs px-2 py-1">
                      {nutritionData.protein.percentage}%
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-2xl font-bold">{nutritionData.protein.grams}g</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Protein</div>
                      <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-600 rounded">
                        <div 
                          className="h-full bg-purple-500 rounded" 
                          style={{ width: `${(nutritionData.protein.grams / nutritionData.protein.goal) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Goal: {nutritionData.protein.goal}g
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 relative">
                    <div className="absolute top-0 right-0 bg-yellow-500/20 text-yellow-500 rounded-bl-lg text-xs px-2 py-1">
                      {nutritionData.fat.percentage}%
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-2xl font-bold">{nutritionData.fat.grams}g</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Fat</div>
                      <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-600 rounded">
                        <div 
                          className="h-full bg-yellow-500 rounded" 
                          style={{ width: `${(nutritionData.fat.grams / nutritionData.fat.goal) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Goal: {nutritionData.fat.goal}g
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Meals Tabs & Food Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="all">
                  <div className="border-b border-gray-200 dark:border-gray-700 px-5 pt-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-poppins font-bold text-lg">Today's Meals</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add Food</span>
                      </Button>
                    </div>
                    <TabsList className="grid grid-cols-5 mb-1">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                      <TabsTrigger value="lunch">Lunch</TabsTrigger>
                      <TabsTrigger value="dinner">Dinner</TabsTrigger>
                      <TabsTrigger value="snacks">Snacks</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all" className="p-5 pt-4">
                    {/* Breakfast Section */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Breakfast</h4>
                        <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                          <Plus className="h-4 w-4 mr-1" />
                          <span className="text-sm">Add</span>
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                            <Coffee className="text-accent h-4 w-4" />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Oatmeal with berries</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">1 cup, mixed berries</p>
                          </div>
                        </div>
                        <span className="font-medium text-sm">320 kcal</span>
                      </div>
                    </div>
                    
                    {/* Lunch Section */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Lunch</h4>
                        <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                          <Plus className="h-4 w-4 mr-1" />
                          <span className="text-sm">Add</span>
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <Utensils className="text-primary h-4 w-4" />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Chicken salad</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">2 cups, grilled chicken</p>
                          </div>
                        </div>
                        <span className="font-medium text-sm">480 kcal</span>
                      </div>
                    </div>
                    
                    {/* Dinner Section */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Dinner</h4>
                        <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                          <Plus className="h-4 w-4 mr-1" />
                          <span className="text-sm">Add</span>
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-green-500/10 rounded-full flex items-center justify-center mr-3">
                            <Utensils className="text-green-500 h-4 w-4" />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Salmon with vegetables</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">6 oz salmon, roasted veggies</p>
                          </div>
                        </div>
                        <span className="font-medium text-sm">440 kcal</span>
                      </div>
                    </div>
                    
                    {/* Snacks Section */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Snacks</h4>
                        <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                          <Plus className="h-4 w-4 mr-1" />
                          <span className="text-sm">Add</span>
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                            <Apple className="text-secondary h-4 w-4" />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Apple with protein bar</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">1 medium apple, 1 protein bar</p>
                          </div>
                        </div>
                        <span className="font-medium text-sm">240 kcal</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="breakfast" className="p-5">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                          <Coffee className="text-accent h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">Oatmeal with berries</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400">1 cup, mixed berries</p>
                        </div>
                      </div>
                      <span className="font-medium text-sm">320 kcal</span>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Breakfast</span>
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="lunch" className="p-5">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <Utensils className="text-primary h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">Chicken salad</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400">2 cups, grilled chicken</p>
                        </div>
                      </div>
                      <span className="font-medium text-sm">480 kcal</span>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Lunch</span>
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="dinner" className="p-5">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-500/10 rounded-full flex items-center justify-center mr-3">
                          <Utensils className="text-green-500 h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">Salmon with vegetables</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400">6 oz salmon, roasted veggies</p>
                        </div>
                      </div>
                      <span className="font-medium text-sm">440 kcal</span>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Dinner</span>
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="snacks" className="p-5">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                          <Apple className="text-secondary h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">Apple with protein bar</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400">1 medium apple, 1 protein bar</p>
                        </div>
                      </div>
                      <span className="font-medium text-sm">240 kcal</span>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Snack</span>
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Food Search & Suggestions */}
          <div>
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Find Foods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search for foods..." className="pl-10" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm">Recent Foods</h4>
                  <Button variant="ghost" size="sm" className="h-auto p-0">
                    <Filter className="h-4 w-4 mr-1" />
                    <span className="text-xs">Filter</span>
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded flex justify-between cursor-pointer">
                    <span className="text-sm">Grilled Chicken Breast</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">165 kcal</span>
                  </div>
                  <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded flex justify-between cursor-pointer">
                    <span className="text-sm">Brown Rice (1 cup)</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">216 kcal</span>
                  </div>
                  <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded flex justify-between cursor-pointer">
                    <span className="text-sm">Broccoli (1 cup)</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">55 kcal</span>
                  </div>
                  <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded flex justify-between cursor-pointer">
                    <span className="text-sm">Greek Yogurt (1 cup)</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">130 kcal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Meal Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mealSuggestions.map((meal, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                          {meal.type === 'breakfast' ? (
                            <Coffee className="text-accent h-4 w-4" />
                          ) : meal.type === 'lunch' || meal.type === 'dinner' ? (
                            <Utensils className={`${meal.type === 'lunch' ? 'text-primary' : 'text-green-500'} h-4 w-4`} />
                          ) : (
                            <Apple className="text-secondary h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">{meal.name}</h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium text-sm">{meal.calories} kcal</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Want personalized meal suggestions?</p>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent"
                    onClick={() => setShowSubscriptionModal(true)}
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    <span>Get Custom Meal Plan</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
