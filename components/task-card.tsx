"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MoreVertical, Pencil, Trash2, Bell } from "lucide-react"
import type { Task } from "@/lib/store"
import { format } from "date-fns"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

const priorityConfig = {
  low: {
    color: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    label: "Low",
  },
  medium: {
    color: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    label: "Medium",
  },
  high: {
    color: "bg-destructive/10 text-destructive border-destructive/20",
    label: "High",
  },
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-1">
            <CardTitle className="text-base leading-tight">{task.title}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {task.subject}
              </Badge>
              <Badge variant="outline" className={`text-xs border ${priorityConfig[task.priority].color}`}>
                {priorityConfig[task.priority].label}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {task.description && (
        <CardContent className="pb-3">
          <CardDescription className="text-sm line-clamp-2">{task.description}</CardDescription>
        </CardContent>
      )}
      <CardContent className="pt-0">
        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
          </div>
          {task.reminder && (
            <div className="flex items-center gap-1">
              <Bell className="h-3 w-3" />
              <span>{task.reminder}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
