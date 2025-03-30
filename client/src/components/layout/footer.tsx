import { Facebook, Instagram, Twitter, Youtube, Heart, Book, Building2, Mail, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
      {/* Background with gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-50/30 dark:to-purple-900/10 opacity-80"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')] opacity-5"></div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-70"></div>
      
      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">FitTrack</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Your ultimate fitness companion for tracking workouts, nutrition, and progress in one place.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, color: "hover:text-blue-600" },
                { icon: Twitter, color: "hover:text-blue-400" },
                { icon: Instagram, color: "hover:text-pink-500" },
                { icon: Youtube, color: "hover:text-red-600" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className={`text-gray-600 dark:text-gray-400 transition-colors duration-300 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Heart className="h-4 w-4 mr-2 text-pink-500" />
              Features
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Workout Plans", href: "/workouts" },
                { name: "Nutrition Tracking", href: "/nutrition" },
                { name: "Progress Analytics", href: "/progress" },
                { name: "AI Recommendations", href: "#" }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Book className="h-4 w-4 mr-2 text-blue-500" />
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Blog", href: "#" },
                { name: "Exercise Library", href: "#" },
                { name: "Nutrition Guide", href: "#" },
                { name: "Community Forum", href: "#" }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-green-500" />
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mt-12 gradient-container p-6 rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Stay updated</h4>
                <p className="text-gray-700 dark:text-gray-300">Get the latest fitness tips and updates</p>
              </div>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <Button className="rounded-r-lg bg-gradient-to-r from-purple-600 to-pink-600 btn-glow border-0">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} FitTrack. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <a 
                key={index}
                href="#" 
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        
        {/* Featured on section with logos */}
        <div className="mt-12 pt-8 border-t dark:border-gray-800">
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-6">Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <img src="https://www.svgrepo.com/show/303161/forbes-logo.svg" alt="Forbes" className="h-6 dark:invert filter grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="https://www.svgrepo.com/show/303124/wired-logo.svg" alt="Wired" className="h-6 dark:invert filter grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="https://www.svgrepo.com/show/303114/techcrunch-logo.svg" alt="TechCrunch" className="h-6 dark:invert filter grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="https://www.svgrepo.com/show/303111/mens-health-logo.svg" alt="Men's Health" className="h-8 dark:invert filter grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>
      </div>
    </footer>
  );
}