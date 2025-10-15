"use client"

import type React from "react"

import { useEffect } from "react"
import { useStore } from "@/lib/store"

const accentColorMap = {
  blue: {
    light: "oklch(0.488 0.243 264.376)",
    dark: "oklch(0.488 0.243 264.376)",
  },
  green: {
    light: "oklch(0.6 0.118 184.704)",
    dark: "oklch(0.696 0.17 162.48)",
  },
  orange: {
    light: "oklch(0.828 0.189 84.429)",
    dark: "oklch(0.645 0.246 16.439)",
  },
  purple: {
    light: "oklch(0.627 0.265 303.9)",
    dark: "oklch(0.627 0.265 303.9)",
  },
  pink: {
    light: "oklch(0.577 0.245 27.325)",
    dark: "oklch(0.637 0.237 25.331)",
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useStore((state) => state.themeMode)
  const accentColor = useStore((state) => state.accentColor)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(themeMode)

    const colorValue = accentColorMap[accentColor][themeMode]
    root.style.setProperty("--color-primary", colorValue)
    root.style.setProperty("--primary", colorValue)
  }, [themeMode, accentColor])

  return <>{children}</>
}
