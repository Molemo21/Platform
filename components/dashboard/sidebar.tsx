"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ProLiinkLogo } from "@/components/proliink-logo"
import { Home, Calendar, User, Settings, LogOut, ChevronLeft, ChevronRight, Moon, Sun, CheckCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { logout } from "@/utils/auth-helpers"
import { useRouter } from "next/navigation"

interface DashboardSidebarProps {
  children: React.ReactNode
  userType: "client" | "contractor" | "admin"
}

export function DashboardSidebar({ children, userType }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
    setShowLogoutConfirm(false)
  }

  // Define navigation items based on user type
  const navItems = {
    client: [
      { name: "Dashboard", href: "/dashboard/client", icon: Home, section: null },
      { name: "My Bookings", href: "/dashboard/client#bookings", icon: Calendar, section: "bookings" },
      { name: "Service History", href: "/dashboard/client#completed", icon: CheckCircle, section: "completed" },
      { name: "Profile", href: "/dashboard/client/profile", icon: User, section: null },
    ],
    contractor: [
      { name: "Dashboard", href: "/dashboard/contractor", icon: Home, section: null },
      { name: "Appointments", href: "/dashboard/contractor/appointments", icon: Calendar, section: null },
      { name: "Profile", href: "/dashboard/contractor/profile", icon: User, section: null },
      { name: "Settings", href: "/dashboard/contractor/settings", icon: Settings, section: null },
    ],
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: Home, section: null },
      { name: "Users", href: "/dashboard/admin/users", icon: User, section: null },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings, section: null },
    ],
  }

  const scrollToSection = (sectionId: string | null) => {
    if (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`relative flex flex-col ${
          collapsed ? "w-20" : "w-64"
        } bg-gradient-to-b from-primary to-secondary dark:from-gray-800 dark:to-gray-900 text-white transition-all duration-300 ease-in-out`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-primary dark:bg-gray-700 text-white rounded-full p-1 shadow-md z-10"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Logo and header */}
        <div className="p-4 flex items-center justify-center">
          <Link href="/" className="flex items-center">
            {collapsed ? <ProLiinkLogo className="h-10 w-10" /> : <ProLiinkLogo className="h-10" />}
          </Link>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {navItems[userType].map((item) => {
              const isActive = pathname === item.href || (item.section && pathname.includes(item.href.split("#")[0]))
              return (
                <div key={item.name} className="mb-2">
                  {item.section ? (
                    <button
                      onClick={() => scrollToSection(item.section)}
                      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                        isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <item.icon className={`${collapsed ? "mx-auto" : "mr-3"}`} size={20} />
                      {!collapsed && <span>{item.name}</span>}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                        isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <item.icon className={`${collapsed ? "mx-auto" : "mr-3"}`} size={20} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex flex-col space-y-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center p-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors ${
                collapsed ? "justify-center" : ""
              }`}
            >
              {isDarkMode ? (
                <>
                  <Sun className={`${collapsed ? "" : "mr-3"}`} size={20} />
                  {!collapsed && <span>Light Mode</span>}
                </>
              ) : (
                <>
                  <Moon className={`${collapsed ? "" : "mr-3"}`} size={20} />
                  {!collapsed && <span>Dark Mode</span>}
                </>
              )}
            </button>

            {/* Logout button */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className={`flex items-center p-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <LogOut className={`${collapsed ? "" : "mr-3"}`} size={20} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white">{children}</div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>You will be redirected to the home page.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
