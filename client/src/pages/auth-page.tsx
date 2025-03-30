import { useState } from "react";
import { useAuth, loginSchema, registerSchema } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect } from "wouter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });
  
  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values);
  }
  
  function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    const { confirmPassword, ...userData } = values;
    registerMutation.mutate(userData);
  }
  
  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Auth Form Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 bg-white dark:bg-darkmode">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <span className="font-poppins font-bold text-xl">FitTrack</span>
            </div>
            <ThemeToggle />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-poppins text-center">Welcome to FitTrack</CardTitle>
              <CardDescription className="text-center">
                Sign in to continue tracking your fitness journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                {/* Login Form */}
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="your-username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" />
                          <label
                            htmlFor="remember"
                            className="text-sm text-gray-600 dark:text-gray-400"
                          >
                            Remember me
                          </label>
                        </div>
                        <a href="#" className="text-sm text-accent hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                {/* Register Form */}
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="your-username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activeTab === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button 
                      onClick={() => setActiveTab("register")}
                      className="text-accent font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button 
                      onClick={() => setActiveTab("login")}
                      className="text-accent font-semibold hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Hero Banner Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-accent hidden md:flex flex-col justify-center items-center p-8">
        <div className="max-w-md text-white text-center">
          <h1 className="font-poppins font-bold text-4xl mb-4">Track Your Fitness Journey</h1>
          <p className="text-white/90 text-lg mb-6">
            Track workouts, monitor progress, and achieve your fitness goals with our comprehensive fitness tracking platform.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">100+</div>
              <div className="text-sm text-white/80">Exercise Templates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">10k+</div>
              <div className="text-sm text-white/80">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">87%</div>
              <div className="text-sm text-white/80">Goal Achievement</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm text-white/80">Progress Tracking</div>
            </div>
          </div>
          <div className="flex justify-center space-x-3">
            <svg height="32" aria-hidden="true" viewBox="0 0 13.229 13.229" className="text-white/90">
              <path d="M11.1 9c.1-.4.2-.9.2-1.3 0-.5-.1-.9-.2-1.3l1.4-1.1c.1-.1.2-.3.1-.5l-1.4-2.4c-.1-.2-.3-.2-.5-.2L9.2 3c-.7-.5-1.5-.9-2.3-1.2l-.3-1.5c0-.2-.2-.3-.4-.3H3.3c-.2 0-.4.1-.4.3L2.6 1.8c-.9.2-1.6.7-2.3 1.2L-.7 2.4c-.2 0-.4 0-.5.2l-1.4 2.4c-.1.2-.1.4.1.5l1.4 1.1c-.1.4-.2.9-.2 1.3 0 .5.1 1 .2 1.4l-1.4 1.1c-.1.1-.2.3-.1.5l1.4 2.4c.1.2.3.2.5.2l1.5-.6c.7.5 1.5.9 2.3 1.2l.3 1.5c0 .2.2.3.4.3h2.7c.2 0 .4-.1.4-.3l.3-1.5c.8-.3 1.6-.7 2.3-1.2l1.5.6c.2 0 .4 0 .5-.2l1.4-2.4c.1-.2.1-.4-.1-.5zm-6.7 1.5c-1.5 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8 2.8 1.3 2.8 2.8-1.3 2.8-2.8 2.8z" fill="currentColor" transform="translate(3.01 .997)"/>
            </svg>
            <svg height="32" aria-hidden="true" viewBox="0 0 18 18" className="text-white/90">
              <path d="M15.667 15.667H2.333V2.333h13.334v13.334zm0-15H2.333C1.4.667.667 1.4.667 2.333v13.334c0 .933.733 1.666 1.666 1.666h13.334c.933 0 1.666-.733 1.666-1.666V2.333c0-.933-.733-1.666-1.666-1.666z" fill="currentColor"/>
              <path d="M12.333 4.667H9C7.9 4.667 7 5.567 7 6.667V9h1.667V6.667h3.666V4.667zm-5.666 8.666H3V11c0-1.1.9-2 2-2h2.333V7.333H5c-2.033 0-3.667 1.634-3.667 3.667v3.333h5.334v-1z" fill="currentColor"/>
            </svg>
            <svg height="32" aria-hidden="true" viewBox="0 0 24 24" className="text-white/90">
              <path d="M20 11.1C20 15.6 14.5 20 12 20c-2.5 0-8-4.4-8-8.9C4 6.4 7.4 3 12 3c4.6 0 8 3.4 8 8.1zm-8 .4c1.8 0 3.3-1.5 3.3-3.3 0-1.8-1.5-3.3-3.3-3.3-1.8 0-3.3 1.5-3.3 3.3 0 1.8 1.5 3.3 3.3 3.3z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
