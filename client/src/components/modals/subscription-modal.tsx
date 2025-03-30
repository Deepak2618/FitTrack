import { useAuth } from "@/hooks/use-auth";
import { Crown, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const { user, togglePremiumMutation } = useAuth();
  const { toast } = useToast();
  
  const handleSubscribe = () => {
    togglePremiumMutation.mutate();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <div className="relative">
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/30 hover:bg-white/50 rounded-full h-8 w-8 p-0 text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-white -mx-6 -mt-6 rounded-t-xl">
            <h2 className="font-poppins font-bold text-2xl mb-2">Upgrade to Premium</h2>
            <p className="text-white/80">Unlock AI-powered workout plans and advanced analytics</p>
          </div>
        </div>
        
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border dark:border-gray-700 rounded-lg p-5 relative transition-all duration-300 hover:shadow-md">
              <div className="absolute -top-3 -right-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
              <h3 className="font-poppins font-bold text-xl mb-2">Monthly</h3>
              <p className="text-3xl font-bold mb-1">$9.99<span className="text-base font-normal text-gray-500 dark:text-gray-400">/month</span></p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Billed monthly</p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start">
                  <Check className="text-secondary h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm">AI Workout Generator</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-secondary h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm">Weekly Progress Reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-secondary h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm">Nutrition Planning</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full border-2 border-primary text-primary hover:bg-primary/10"
                onClick={handleSubscribe}
                disabled={togglePremiumMutation.isPending}
              >
                Choose Plan
              </Button>
            </Card>
            
            <Card className="border dark:border-gray-700 rounded-lg p-5 transition-all duration-300 hover:shadow-md">
              <h3 className="font-poppins font-bold text-xl mb-2">Yearly</h3>
              <p className="text-3xl font-bold mb-1">$89.99<span className="text-base font-normal text-gray-500 dark:text-gray-400">/year</span></p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Billed annually</p>
              <p className="text-secondary text-sm mb-4">Save 25%</p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start">
                  <Check className="text-secondary h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm">AI Workout Generator</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-secondary h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm">Weekly Progress Reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-secondary h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm">Nutrition Planning</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-secondary h-4 w-4 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm">Premium Video Tutorials</span>
                </li>
              </ul>
              <Button 
                className="w-full" 
                onClick={handleSubscribe}
                disabled={togglePremiumMutation.isPending}
              >
                Choose Plan
              </Button>
            </Card>
          </div>
          
          <div className="border-t dark:border-gray-700 pt-6">
            <h4 className="font-semibold mb-3">Premium Benefits:</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary/20 text-secondary mr-3">
                  <Crown className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="font-medium text-sm">AI Coach</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Personalized workout recommendations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 text-primary mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="M18.4 9.4l-4.2 4.2-2.3-2.3-4.2 4.2"/>
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Advanced Analytics</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">In-depth progress tracking</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500/20 text-blue-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/>
                    <path d="M4 10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
                    <path d="M10 2v2"/>
                    <path d="M14 2v2"/>
                    <path d="M10 14v4"/>
                    <path d="M14 14v4"/>
                    <path d="M10 10h4"/>
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Meal Plans</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Custom nutrition guidance</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-500/20 text-purple-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Community Access</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Join premium fitness groups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
