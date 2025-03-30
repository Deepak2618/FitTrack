import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Track Your Fitness Journey Like Never Before
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              FitTrack helps you create personalized workout plans, track your progress, and achieve your fitness goals with smart analytics and AI-powered recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/workouts">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/progress">
                  View Progress
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Person tracking workout on app" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 -right-16 w-72 h-72 bg-accent opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-16 w-72 h-72 bg-primary opacity-20 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10k+</div>
            <div className="text-gray-600 dark:text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-400">Exercise Templates</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">87%</div>
            <div className="text-gray-600 dark:text-gray-400">Goal Achievement</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">Progress Tracking</div>
          </div>
        </div>
      </div>
    </div>
  );
}