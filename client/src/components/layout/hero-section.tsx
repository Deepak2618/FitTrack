import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 dark:from-purple-500/30 dark:to-pink-500/30"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      {/* Animated shapes */}
      <div className="absolute top-1/4 -right-16 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-8 -left-16 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 left-1/4 w-48 h-48 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container relative z-10 mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              Track Your Fitness Journey Like Never Before
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              FitTrack helps you create personalized workout plans, track your progress, and achieve your fitness goals with smart analytics and AI-powered recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 btn-glow border-0 text-white">
                <Link href="/workouts" className="flex items-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400">
                <Link href="/progress">
                  View Progress
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-xl shadow-xl overflow-hidden glass-panel p-2">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Person tracking workout on app" 
                className="w-full h-auto object-cover rounded-lg"
              />
              
              {/* Overlaid UI elements */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-lg flex items-center gap-2 backdrop-blur-sm">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Tracking</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10k+', label: 'Active Users' },
            { value: '500+', label: 'Exercise Templates' },
            { value: '87%', label: 'Goal Achievement' },
            { value: '24/7', label: 'Progress Tracking' },
          ].map((stat, index) => (
            <div key={index} className="text-center glass-panel py-4 px-2 rounded-lg">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">{stat.value}</div>
              <div className="text-gray-700 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}