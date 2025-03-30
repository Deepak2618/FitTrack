import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PremiumBadge } from "@/components/ui/premium-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OnboardingModal } from "@/components/modals/onboarding-modal";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  Dumbbell,
  BarChart3,
  Utensils,
  Plus,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Crown,
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const { user, logoutMutation, showOnboardingModal, setShowOnboardingModal } = useAuth();
  
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user?.username[0].toUpperCase() || "U";
  };
  
  const getUserFullName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.username || "User";
  };
  
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto flex flex-col dark:bg-darkmode">
      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboardingModal} 
        onClose={() => setShowOnboardingModal(false)} 
      />
      
      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)} 
      />
      
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-darkmode/80 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <span className="font-poppins font-bold text-xl hidden sm:block">FitTrack</span>
              </div>
            </div>
            
            {/* Navigation - Desktop */}
            <nav className="hidden md:flex">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link
                    href="/"
                    className={`font-medium ${location === '/' ? 'active-nav' : ''}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/workouts"
                    className={`font-medium ${location === '/workouts' ? 'active-nav' : ''}`}
                  >
                    Workouts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/nutrition"
                    className={`font-medium ${location === '/nutrition' ? 'active-nav' : ''}`}
                  >
                    Nutrition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/progress"
                    className={`font-medium ${location === '/progress' ? 'active-nav' : ''}`}
                  >
                    Progress
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Premium Button */}
              <PremiumBadge onClick={() => setShowSubscriptionModal(true)} />
              
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt="Profile" />
                      <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-textColor dark:text-white">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuLabel>
                    <p className="font-medium text-sm">{getUserFullName()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.username}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setShowOnboardingModal(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help Center</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile Menu Toggle */}
              <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden flex items-center">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent className="w-[260px] sm:w-[384px]">
                  <SheetHeader className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                      </div>
                      <SheetTitle className="font-poppins font-bold text-xl">FitTrack</SheetTitle>
                    </div>
                    <button
                      onClick={() => setMobileSheetOpen(false)}
                      className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </SheetHeader>
                  
                  <nav className="mb-6">
                    <ul className="space-y-4">
                      <li>
                        <Link 
                          href="/" 
                          onClick={() => setMobileSheetOpen(false)}
                          className={`flex items-center py-2 ${location === '/' ? 'text-primary font-semibold' : ''}`}
                        >
                          <Home className="mr-3 h-5 w-5" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/workouts" 
                          onClick={() => setMobileSheetOpen(false)}
                          className={`flex items-center py-2 ${location === '/workouts' ? 'text-primary font-semibold' : ''}`}
                        >
                          <Dumbbell className="mr-3 h-5 w-5" />
                          <span>Workouts</span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/nutrition" 
                          onClick={() => setMobileSheetOpen(false)}
                          className={`flex items-center py-2 ${location === '/nutrition' ? 'text-primary font-semibold' : ''}`}
                        >
                          <Utensils className="mr-3 h-5 w-5" />
                          <span>Nutrition</span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/progress" 
                          onClick={() => setMobileSheetOpen(false)}
                          className={`flex items-center py-2 ${location === '/progress' ? 'text-primary font-semibold' : ''}`}
                        >
                          <BarChart3 className="mr-3 h-5 w-5" />
                          <span>Progress</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  
                  <div className="border-t dark:border-gray-800 pt-4">
                    <button 
                      onClick={() => {
                        setMobileSheetOpen(false);
                        setShowSubscriptionModal(true);
                      }} 
                      className="flex items-center py-2 text-primary"
                    >
                      <Crown className="mr-3 h-5 w-5" />
                      <span>Upgrade to Premium</span>
                    </button>
                    <button 
                      onClick={() => {
                        setMobileSheetOpen(false);
                        setShowOnboardingModal(true);
                      }} 
                      className="flex items-center py-2 text-gray-600 dark:text-gray-400"
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      <span>Settings</span>
                    </button>
                    <button className="flex items-center py-2 text-gray-600 dark:text-gray-400">
                      <HelpCircle className="mr-3 h-5 w-5" />
                      <span>Help & Support</span>
                    </button>
                    <button 
                      onClick={() => {
                        setMobileSheetOpen(false);
                        handleLogout();
                      }} 
                      className="flex items-center py-2 text-red-500"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        {children}
      </main>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-30">
        <div className="flex justify-around items-center p-3">
          <Link href="/" className={`flex flex-col items-center py-1 ${location === '/' ? 'text-primary' : ''}`}>
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link href="/workouts" className={`flex flex-col items-center py-1 ${location === '/workouts' ? 'text-primary' : ''}`}>
            <Dumbbell className="h-5 w-5" />
            <span className="text-xs mt-1">Workouts</span>
          </Link>
          
          <Link href="/workouts" className="flex flex-col items-center py-1">
            <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white">
              <Plus className="h-5 w-5" />
            </div>
          </Link>
          
          <Link href="/nutrition" className={`flex flex-col items-center py-1 ${location === '/nutrition' ? 'text-primary' : ''}`}>
            <Utensils className="h-5 w-5" />
            <span className="text-xs mt-1">Nutrition</span>
          </Link>
          
          <Link href="/progress" className={`flex flex-col items-center py-1 ${location === '/progress' ? 'text-primary' : ''}`}>
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs mt-1">Progress</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
