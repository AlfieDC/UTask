"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import type { Task } from "@/lib/store"

interface SubjectBreakdownProps {
  tasks: Task[]
}

export function SubjectBreakdown({ tasks }: SubjectBreakdownProps) {
  const subjectCounts = tasks.reduce(
    (acc, task) => {
      if (!acc[task.subject]) {
        acc[task.subject] = { total: 0, completed: 0 }
      }
      acc[task.subject].total++
      if (task.status === "done") {
        acc[task.subject].completed++
      }
      return acc
    },
    {} as Record<string, { total: number; completed: number }>,
  )

  const subjects = Object.entries(subjectCounts).sort((a, b) => b[1].total - a[1].total)

  const colors = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Subject Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        {subjects.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No subjects yet</p>
        ) : (
          <div className="space-y-4">
            {subjects.map(([subject, data], index) => {
              const percentage = (data.completed / data.total) * 100
              return (
                <div key={subject} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{subject}</span>
                    <span className="text-muted-foreground">
                      {data.completed}/{data.total}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[index % colors.length]} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
