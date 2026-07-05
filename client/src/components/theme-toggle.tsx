import { Moon, Sun } from "lucide-react"
import * as React from "react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

function useResolvedTheme() {
  const { theme } = useTheme()
  const [systemPrefersDark, setSystemPrefersDark] = React.useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  )

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => setSystemPrefersDark(query.matches)
    query.addEventListener("change", handleChange)
    return () => query.removeEventListener("change", handleChange)
  }, [])

  if (theme === "system") {
    return systemPrefersDark ? "dark" : "light"
  }

  return theme
}

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const resolved = useResolvedTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
    >
      {resolved === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
