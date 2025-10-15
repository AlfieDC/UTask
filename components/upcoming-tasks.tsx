"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import type { Task } from "@/lib/store"
import { format, isToday, isTomorrow, isPast } from "date-fns"

interface UpcomingTasksProps {
  tasks: Task[]
}

export function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  const sortedTasks = [...tasks]
    .filter((task) => task.status !== "done")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString)
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    if (isPast(date)) return "Overdue"
    return format(date, "MMM dd")
  }

  const getDateColor = (dateString: string) => {
    const date = new Date(dateString)
    if (isPast(date) && !isToday(date)) return "text-destructive"
    if (isToday(date)) return "text-chart-4"
    return "text-muted-foreground"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No upcoming tasks</p>
        ) : (
          <div className="space-y-4">
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{task.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {task.subject}
                    </Badge>
                    <span className={`text-xs flex items-center gap-1 ${getDateColor(task.dueDate)}`}>
                      <Calendar className="h-3 w-3" />
                      {getDateLabel(task.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
