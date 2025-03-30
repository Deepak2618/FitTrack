import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
              </div>
              <span className="text-xl font-bold">FitTrack</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your ultimate fitness companion for tracking workouts, nutrition, and progress in one place.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link href="/workouts" className="text-gray-600 hover:text-primary dark:text-gray-400">Workout Plans</Link></li>
              <li><Link href="/nutrition" className="text-gray-600 hover:text-primary dark:text-gray-400">Nutrition Tracking</Link></li>
              <li><Link href="/progress" className="text-gray-600 hover:text-primary dark:text-gray-400">Progress Analytics</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">AI Recommendations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">Exercise Library</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">Nutrition Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">Community Forum</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} FitTrack. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-400 text-sm">Cookie Policy</a>
          </div>
        </div>
        
        {/* Featured on section with logos */}
        <div className="mt-12 pt-8 border-t dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <img src="https://www.svgrepo.com/show/303161/forbes-logo.svg" alt="Forbes" className="h-6 dark:invert" />
            <img src="https://www.svgrepo.com/show/303124/wired-logo.svg" alt="Wired" className="h-6 dark:invert" />
            <img src="https://www.svgrepo.com/show/303114/techcrunch-logo.svg" alt="TechCrunch" className="h-6 dark:invert" />
            <img src="https://www.svgrepo.com/show/303111/mens-health-logo.svg" alt="Men's Health" className="h-8 dark:invert" />
          </div>
        </div>
      </div>
    </footer>
  );
}