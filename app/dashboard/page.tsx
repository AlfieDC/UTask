"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ListTodo, Clock, TrendingUp, Plus } from "lucide-react"
import { useStore } from "@/lib/store"
import { getCurrentUser } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { StatCard } from "@/components/stat-card"
import { ProgressRing } from "@/components/progress-ring"
import { UpcomingTasks } from "@/components/upcoming-tasks"
import { SubjectBreakdown } from "@/components/subject-breakdown"

export default function DashboardPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const tasks = useStore((state) => state.tasks)
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

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "done").length
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress").length
  const todoTasks = tasks.filter((task) => task.status === "todo").length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div
          className={`mb-6 md:mb-8 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-balance">Welcome back, {currentUser.username}!</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Here's an overview of your tasks and progress
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 transition-all duration-500 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <StatCard title="Total Tasks" value={totalTasks} icon={ListTodo} description="All time" />
          <StatCard title="Completed" value={completedTasks} icon={CheckCircle2} description="Tasks finished" />
          <StatCard title="In Progress" value={inProgressTasks} icon={Clock} description="Currently working on" />
          <StatCard title="To Do" value={todoTasks} icon={TrendingUp} description="Pending tasks" />
        </div>

        {/* Main Content Grid */}
        <div
          className={`grid gap-4 md:gap-6 lg:grid-cols-3 mb-6 md:mb-8 transition-all duration-500 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Progress Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-base md:text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6 md:py-8">
              <ProgressRing progress={completionRate} size={100} />
              <p className="text-xs md:text-sm text-muted-foreground mt-4">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </CardContent>
          </Card>

          {/* Subject Breakdown */}
          <SubjectBreakdown tasks={tasks} />

          {/* Upcoming Tasks */}
          <UpcomingTasks tasks={tasks} />
        </div>

        {/* Quick Actions */}
        <Card
          className={`transition-all duration-500 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => router.push("/tasks")} className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Task
              </Button>
              <Button variant="outline" onClick={() => router.push("/tasks")}>
                View All Tasks
              </Button>
              <Button variant="outline" onClick={() => router.push("/settings")}>
                Customize Theme
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
