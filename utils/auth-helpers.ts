// Simple auth helpers for the demo
// In a real app, you would use a proper auth solution

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isLoggedIn") === "true"
}

export function getUserType(): "client" | "contractor" {
  if (typeof window === "undefined") return "client"
  return (localStorage.getItem("userType") as "client" | "contractor") || "client"
}

export function login(userType: "client" | "contractor" | "admin"): void {
  localStorage.setItem("isLoggedIn", "true")
  localStorage.setItem("userType", userType)
}

export function logout(): void {
  localStorage.removeItem("isLoggedIn")
  // We don't remove userType to remember the last login type
}
