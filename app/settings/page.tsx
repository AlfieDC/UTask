"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Palette, Check } from "lucide-react"
import { useStore } from "@/lib/store"
import { getCurrentUser } from "@/lib/auth"
import { Navbar } from "@/components/navbar"

const accentColors = [
  {
    name: "Blue",
    value: "blue" as const,
    lightColor: "oklch(0.488 0.243 264.376)",
    darkColor: "oklch(0.488 0.243 264.376)",
  },
  {
    name: "Green",
    value: "green" as const,
    lightColor: "oklch(0.6 0.118 184.704)",
    darkColor: "oklch(0.696 0.17 162.48)",
  },
  {
    name: "Orange",
    value: "orange" as const,
    lightColor: "oklch(0.828 0.189 84.429)",
    darkColor: "oklch(0.645 0.246 16.439)",
  },
  {
    name: "Purple",
    value: "purple" as const,
    lightColor: "oklch(0.627 0.265 303.9)",
    darkColor: "oklch(0.627 0.265 303.9)",
  },
  {
    name: "Pink",
    value: "pink" as const,
    lightColor: "oklch(0.577 0.245 27.325)",
    darkColor: "oklch(0.637 0.237 25.331)",
  },
]

export default function SettingsPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const themeMode = useStore((state) => state.themeMode)
  const accentColor = useStore((state) => state.accentColor)
  const setThemeMode = useStore((state) => state.setThemeMode)
  const setAccentColor = useStore((state) => state.setAccentColor)
  const setCurrentUser = useStore((state) => state.setCurrentUser)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const user = getCurrentUser()
    if (!user) {
      router.push("/")
    } else if (!currentUser) {
      setCurrentUser(user)
    }
  }, [router, currentUser, setCurrentUser])

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-2xl mx-auto">
          <div
            className={`mb-6 md:mb-8 transition-all duration-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-balance">Settings</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">Customize your UTask experience</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Theme Mode */}
            <Card
              className={`transition-all duration-500 delay-100 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  {themeMode === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  Theme Mode
                </CardTitle>
                <CardDescription className="text-sm">Choose between light and dark mode</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <button
                    onClick={() => setThemeMode("light")}
                    className={`relative flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-lg border-2 transition-all hover:border-primary/50 ${
                      themeMode === "light" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    {themeMode === "light" && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                    )}
                    <Sun className="h-6 w-6 md:h-8 md:w-8" />
                    <div className="text-center">
                      <p className="font-medium text-sm md:text-base">Light</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">Bright and clean</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setThemeMode("dark")}
                    className={`relative flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-lg border-2 transition-all hover:border-primary/50 ${
                      themeMode === "dark" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    {themeMode === "dark" && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                    )}
                    <Moon className="h-6 w-6 md:h-8 md:w-8" />
                    <div className="text-center">
                      <p className="font-medium text-sm md:text-base">Dark</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">Easy on the eyes</p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Accent Color */}
            <Card
              className={`transition-all duration-500 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Palette className="h-5 w-5" />
                  Accent Color
                </CardTitle>
                <CardDescription className="text-sm">Choose your preferred accent color</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-3 md:gap-4">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setAccentColor(color.value)}
                      className={`relative p-1 rounded-full transition-all hover:scale-110 ${
                        accentColor === color.value ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                      }`}
                      title={color.name}
                    >
                      {accentColor === color.value && (
                        <div className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-border"
                        style={{
                          backgroundColor: themeMode === "light" ? color.lightColor : color.darkColor,
                        }}
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card
              className={`transition-all duration-500 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Account Information</CardTitle>
                <CardDescription className="text-sm">Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Username</Label>
                  <div className="px-3 py-2 bg-muted rounded-md text-sm">{currentUser.username}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">User ID</Label>
                  <div className="px-3 py-2 bg-muted rounded-md text-xs font-mono break-all">{currentUser.id}</div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card
              className={`transition-all duration-500 delay-[400ms] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Data Management</CardTitle>
                <CardDescription className="text-sm">Manage your task data stored locally</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Local Storage</p>
                      <p className="text-xs text-muted-foreground">All data is stored in your browser</p>
                    </div>
                    <Button variant="outline" size="sm" disabled className="w-full sm:w-auto bg-transparent">
                      Export Data
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Note: Your tasks and preferences are saved locally in your browser. Clearing browser data will
                    remove all your tasks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
