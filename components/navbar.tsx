"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, LogOut } from "lucide-react"
import { ProLiinkLogo } from "./proliink-logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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

interface NavbarProps {
  isLoggedIn?: boolean
  userType?: "client" | "contractor"
}

export function Navbar({ isLoggedIn = false, userType = "client" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const router = useRouter()

  // Track scroll position to add background opacity when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
    setShowLogoutConfirm(false)
  }

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (id: string) => {
    if (id.startsWith("#")) {
      const element = document.getElementById(id.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      setIsOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-heading ${
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:bg-gray-900/90 dark:border-gray-800/50"
            : "bg-white/70 backdrop-blur-md dark:bg-gray-900/70"
        }`}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link href="/" className="font-heading font-bold">
                <ProLiinkLogo className="text-primary dark:text-white" />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <ul className="flex space-x-1 mr-4">
                {navItems.map((item, i) => (
                  <motion.li key={item.name} custom={i} variants={navItemVariants} initial="hidden" animate="visible">
                    {item.href.startsWith("#") ? (
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="relative px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-white transition-colors duration-200 group font-heading font-medium"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="relative px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-white transition-colors duration-200 group font-heading font-medium"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Login Button with Dropdown */}
              {!isLoggedIn && (
                <motion.div
                  custom={navItems.length}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="mr-2"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1 font-heading">
                        Login <ChevronDown size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="font-body">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/login"
                          className="w-full"
                          onClick={() => localStorage.setItem("userType", "client")}
                        >
                          Login as Client
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/login"
                          className="w-full"
                          onClick={() => localStorage.setItem("userType", "contractor")}
                        >
                          Login as Contractor
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              )}

              {/* Get Started or Dashboard Button */}
              <motion.div custom={navItems.length + 1} variants={navItemVariants} initial="hidden" animate="visible">
                {isLoggedIn ? (
                  <motion.button
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-heading font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={`/dashboard/${userType}`}>Dashboard</Link>
                  </motion.button>
                ) : (
                  <motion.button
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-heading font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/register/client">Get Started</Link>
                  </motion.button>
                )}
              </motion.div>

              {/* Logout Button (only when logged in) */}
              {isLoggedIn && (
                <motion.div
                  custom={navItems.length + 2}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="ml-2"
                >
                  <Button
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => setShowLogoutConfirm(true)}
                  >
                    <LogOut size={16} className="mr-1" /> Logout
                  </Button>
                </motion.div>
              )}

              {/* Hamburger Menu Dropdown (only when not logged in) */}
              {!isLoggedIn && (
                <motion.div
                  custom={navItems.length + 2}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="ml-2"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Menu size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/contractors" className="w-full">
                          Become a Contractor
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-gray-700 dark:text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-3 pb-4"
              >
                <ul className="flex flex-col space-y-3">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    >
                      {item.href.startsWith("#") ? (
                        <button
                          onClick={() => scrollToSection(item.href)}
                          className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-white transition-colors duration-200 w-full text-left font-heading font-medium"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-white transition-colors duration-200 font-heading font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}

                  {/* Login Options */}
                  {!isLoggedIn && (
                    <>
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                      >
                        <Link
                          href="/login"
                          className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-white transition-colors duration-200 font-heading font-medium"
                          onClick={() => {
                            localStorage.setItem("userType", "client")
                            setIsOpen(false)
                          }}
                        >
                          Login as Client
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + 1) * 0.1, duration: 0.3 }}
                      >
                        <Link
                          href="/login"
                          className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-white transition-colors duration-200 font-heading font-medium"
                          onClick={() => {
                            localStorage.setItem("userType", "contractor")
                            setIsOpen(false)
                          }}
                        >
                          Login as Contractor
                        </Link>
                      </motion.li>
                    </>
                  )}

                  {/* Get Started or Dashboard Button */}
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + 2) * 0.1, duration: 0.3 }}
                    className="pt-2"
                  >
                    {isLoggedIn ? (
                      <motion.button
                        className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-heading font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={`/dashboard/${userType}`} onClick={() => setIsOpen(false)}>
                          Dashboard
                        </Link>
                      </motion.button>
                    ) : (
                      <motion.button
                        className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md font-heading font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href="/register/client" onClick={() => setIsOpen(false)}>
                          Get Started
                        </Link>
                      </motion.button>
                    )}
                  </motion.li>

                  {/* Logout Button (only when logged in) */}
                  {isLoggedIn && (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navItems.length + 3) * 0.1, duration: 0.3 }}
                    >
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          setShowLogoutConfirm(true)
                          setIsOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </motion.li>
                  )}

                  {/* Become a Contractor (only when not logged in) */}
                  {!isLoggedIn && (
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navItems.length + 3) * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href="/contractors"
                        className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-white transition-colors duration-200 font-heading font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Become a Contractor
                      </Link>
                    </motion.li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

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
    </>
  )
}
