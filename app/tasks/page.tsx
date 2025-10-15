"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useStore } from "@/lib/store"
import { getCurrentUser } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { TaskCard } from "@/components/task-card"
import { TaskDialog } from "@/components/task-dialog"
import type { Task } from "@/lib/store"

const columns = [
  { id: "todo", title: "To Do", color: "border-chart-1" },
  { id: "in-progress", title: "In Progress", color: "border-chart-4" },
  { id: "done", title: "Done", color: "border-chart-2" },
]

export default function TasksPage() {
  const router = useRouter()
  const currentUser = useStore((state) => state.currentUser)
  const tasks = useStore((state) => state.tasks)
  const updateTask = useStore((state) => state.updateTask)
  const addTask = useStore((state) => state.addTask)
  const deleteTask = useStore((state) => state.deleteTask)
  const setCurrentUser = useStore((state) => state.setCurrentUser)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
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

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const newStatus = destination.droppableId as "todo" | "in-progress" | "done"
    updateTask(draggableId, { status: newStatus })
  }

  const handleSaveTask = (taskData: Omit<Task, "id" | "createdAt"> | Task) => {
    if ("id" in taskData) {
      updateTask(taskData.id, taskData)
    } else {
      addTask(taskData)
    }
    setEditingTask(null)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setDialogOpen(true)
  }

  const handleDeleteTask = (id: string) => {
    deleteTask(id)
  }

  const handleNewTask = () => {
    setEditingTask(null)
    setDialogOpen(true)
  }

  if (!mounted || !currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-balance">Task Board</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">Organize your tasks with drag-and-drop</p>
          </div>
          <Button onClick={handleNewTask} className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div
            className={`grid gap-4 md:gap-6 lg:grid-cols-3 transition-all duration-500 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {columns.map((column) => {
              const columnTasks = tasks.filter((task) => task.status === column.id)
              return (
                <div key={column.id} className="flex flex-col">
                  <Card className={`border-t-4 ${column.color} flex-1`}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-base md:text-lg">
                        <span>{column.title}</span>
                        <span className="text-sm font-normal text-muted-foreground">{columnTasks.length}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`space-y-3 min-h-[200px] rounded-lg p-2 transition-colors ${
                              snapshot.isDraggingOver ? "bg-accent/50" : ""
                            }`}
                          >
                            {columnTasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`transition-all ${snapshot.isDragging ? "opacity-50 rotate-2 scale-105" : ""}`}
                                  >
                                    <TaskCard task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </DragDropContext>

        <TaskDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleSaveTask} task={editingTask} />
      </div>
    </div>
  )
}
