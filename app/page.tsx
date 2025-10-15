"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, LayoutDashboard, Palette, Sparkles } from "lucide-react"
import { login, register, getCurrentUser } from "@/lib/auth"
import { useStore } from "@/lib/store"

export default function LandingPage() {
  const router = useRouter()
  const setCurrentUser = useStore((state) => state.setCurrentUser)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
      router.push("/dashboard")
    }
  }, [router, setCurrentUser])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const result = login(username, password)

    if (result.success && result.user) {
      setCurrentUser(result.user)
      router.push("/dashboard")
    } else {
      setError(result.error || "Login failed")
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    const result = register(username, password)

    if (result.success) {
      const loginResult = login(username, password)
      if (loginResult.success && loginResult.user) {
        setCurrentUser(loginResult.user)
        router.push("/dashboard")
      }
    } else {
      setError(result.error || "Registration failed")
    }

    setIsLoading(false)
  }

  const handleGuestMode = () => {
    const guestUser = { id: "guest", username: "Guest" }
    setCurrentUser(guestUser)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div
            className={`text-center mb-12 md:mb-16 space-y-4 md:space-y-6 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Your Personal Productivity Companion</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-balance bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              UTask
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto px-4">
              A modern, visually appealing task tracker built for students to organize and manage their daily academic
              tasks
            </p>
          </div>

          {/* Features Grid */}
          <div
            className={`grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 transition-all duration-700 delay-150 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <LayoutDashboard className="w-8 h-8 md:w-10 md:h-10 text-primary mb-2" />
                <CardTitle className="text-base md:text-lg">Kanban Board</CardTitle>
                <CardDescription className="text-sm">
                  Drag-and-drop tasks between To Do, In Progress, and Done columns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-chart-2 mb-2" />
                <CardTitle className="text-base md:text-lg">Track Progress</CardTitle>
                <CardDescription className="text-sm">
                  Visualize your productivity with statistics and progress charts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:col-span-2 md:col-span-1">
              <CardHeader>
                <Palette className="w-8 h-8 md:w-10 md:h-10 text-chart-3 mb-2" />
                <CardTitle className="text-base md:text-lg">Customizable Themes</CardTitle>
                <CardDescription className="text-sm">
                  Personalize your experience with light/dark modes and accent colors
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Auth Card */}
          <Card
            className={`max-w-md mx-auto border-2 shadow-xl transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Get Started</CardTitle>
              <CardDescription>Create an account or login to access your tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input id="login-username" name="username" placeholder="Enter your username" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input id="register-username" name="username" placeholder="Choose a username" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder="Choose a password"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm">Confirm Password</Label>
                      <Input
                        id="register-confirm"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent" onClick={handleGuestMode}>
                Continue as Guest
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
