"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Menu, Moon, Sun, X } from "lucide-react"
import { ProLiinkLogo } from "./proliink-logo"

interface SiteHeaderProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
  scrollToSection?: (id: string) => void
  showSectionLinks?: boolean
}

export function SiteHeader({ isDarkMode, toggleDarkMode, scrollToSection, showSectionLinks = false }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position to add background to header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleScrollToSection = (id: string) => {
    if (scrollToSection) {
      scrollToSection(id)
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-heading ${
        isScrolled || isMobileMenuOpen ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ProLiinkLogo className={`h-8 w-auto ${isScrolled ? "text-primary dark:text-white" : "text-white"}`} />
          </div>

          <button
            className={`p-2 rounded-md focus:outline-none md:hidden font-medium ${
              isScrolled ? "text-primary dark:text-white" : "text-white"
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <ul className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            {showSectionLinks && (
              <>
                <li>
                  <button
                    onClick={() => handleScrollToSection("how-it-works")}
                    className={`px-3 py-2 rounded-md hover:bg-white/10 font-medium ${
                      isScrolled ? "text-gray-700 dark:text-white" : "text-white"
                    }`}
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollToSection("about")}
                    className={`px-3 py-2 rounded-md hover:bg-white/10 font-medium ${
                      isScrolled ? "text-gray-700 dark:text-white" : "text-white"
                    }`}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollToSection("services")}
                    className={`px-3 py-2 rounded-md hover:bg-white/10 font-medium ${
                      isScrolled ? "text-gray-700 dark:text-white" : "text-white"
                    }`}
                  >
                    Services
                  </button>
                </li>
              </>
            )}
            <li>
              <Button
                variant="outline"
                asChild
                size="sm"
                className={`border font-medium ${
                  isScrolled
                    ? "text-primary hover:text-secondary border-gray-300 dark:text-white dark:border-gray-600"
                    : "text-white border-white/30 hover:bg-white/10"
                }`}
              >
                <Link href="/login">Login</Link>
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                asChild
                size="sm"
                className={`border font-medium ${
                  isScrolled
                    ? "text-primary hover:text-secondary border-gray-300 dark:text-white dark:border-gray-600"
                    : "text-white border-white/30 hover:bg-white/10"
                }`}
              >
                <Link href="/demo">Demo</Link>
              </Button>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className={`font-medium ${
                      isScrolled
                        ? "bg-primary text-white hover:bg-primary/90 dark:bg-white dark:text-primary"
                        : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                    }`}
                  >
                    Register
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="font-body">
                  <DropdownMenuItem asChild>
                    <Link href="/register/client">Register as Client</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register/contractor">Register as Contractor</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="ml-2">
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                icon={isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              />
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-white/10 dark:border-gray-700">
            <ul className="flex flex-col space-y-3 pt-3 font-medium">
              {showSectionLinks && (
                <>
                  <li>
                    <button
                      onClick={() => handleScrollToSection("how-it-works")}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-gray-700 dark:text-white"
                    >
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleScrollToSection("about")}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-gray-700 dark:text-white"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleScrollToSection("services")}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-gray-700 dark:text-white"
                    >
                      Services
                    </button>
                  </li>
                </>
              )}
              <li className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md bg-white/10 text-center text-gray-700 dark:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/demo"
                  className="block px-3 py-2 rounded-md bg-white/10 text-center text-gray-700 dark:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Demo
                </Link>
                <Link
                  href="/register/client"
                  className="block px-3 py-2 rounded-md bg-primary text-center text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register as Client
                </Link>
                <Link
                  href="/register/contractor"
                  className="block px-3 py-2 rounded-md bg-primary/80 text-center text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register as Contractor
                </Link>
              </li>
              <li className="flex items-center justify-between px-3">
                <span className="text-gray-700 dark:text-white">Dark Mode</span>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                  icon={isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
