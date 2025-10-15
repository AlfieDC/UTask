export interface User {
  id: string
  username: string
  password: string
  createdAt: string
}

export interface AuthUser {
  id: string
  username: string
}

const USERS_KEY = "utask_users"
const CURRENT_USER_KEY = "utask_current_user"

// Simple hash function for password (not cryptographically secure, but better than plain text)
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash.toString(36)
}

export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function register(username: string, password: string): { success: boolean; error?: string } {
  const users = getUsers()

  if (users.find((u) => u.username === username)) {
    return { success: false, error: "Username already exists" }
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    username,
    password: simpleHash(password),
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  return { success: true }
}

export function login(username: string, password: string): { success: boolean; error?: string; user?: AuthUser } {
  const users = getUsers()
  const user = users.find((u) => u.username === username && u.password === simpleHash(password))

  if (!user) {
    return { success: false, error: "Invalid username or password" }
  }

  const authUser: AuthUser = { id: user.id, username: user.username }
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser))

  return { success: true, user: authUser }
}

export function logout(): void {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}
