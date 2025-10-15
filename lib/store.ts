import { create } from "zustand"

export interface Task {
  id: string
  title: string
  description: string
  subject: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "done"
  dueDate: string
  reminder?: string
  createdAt: string
}

export type ThemeMode = "light" | "dark"
export type AccentColor = "blue" | "green" | "purple" | "orange" | "pink"

interface UserData {
  tasks: Task[]
  themeMode: ThemeMode
  accentColor: AccentColor
}

interface AppState {
  currentUser: { id: string; username: string } | null
  tasks: Task[]
  themeMode: ThemeMode
  accentColor: AccentColor
  setCurrentUser: (user: { id: string; username: string } | null) => void
  loadUserData: (userId: string) => void
  saveUserData: () => void
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  setThemeMode: (mode: ThemeMode) => void
  setAccentColor: (color: AccentColor) => void
}

export const useStore = create<AppState>((set, get) => ({
  currentUser: null,
  tasks: [],
  themeMode: "dark",
  accentColor: "blue",

  setCurrentUser: (user) => {
    set({ currentUser: user })
    if (user) {
      get().loadUserData(user.id)
    }
  },

  loadUserData: (userId) => {
    const data = localStorage.getItem(`utask_data_${userId}`)
    if (data) {
      const userData: UserData = JSON.parse(data)
      set({
        tasks: userData.tasks || [],
        themeMode: userData.themeMode || "dark",
        accentColor: userData.accentColor || "blue",
      })
    }
  },

  saveUserData: () => {
    const { currentUser, tasks, themeMode, accentColor } = get()
    if (currentUser) {
      const userData: UserData = { tasks, themeMode, accentColor }
      localStorage.setItem(`utask_data_${currentUser.id}`, JSON.stringify(userData))
    }
  },

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    set((state) => ({ tasks: [...state.tasks, newTask] }))
    get().saveUserData()
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    }))
    get().saveUserData()
  },

  deleteTask: (id) => {
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }))
    get().saveUserData()
  },

  setThemeMode: (mode) => {
    set({ themeMode: mode })
    get().saveUserData()
  },

  setAccentColor: (color) => {
    set({ accentColor: color })
    get().saveUserData()
  },
}))
