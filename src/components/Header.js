"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const services = [
  { name: "Plumber", icon: "fa-wrench", slug: "plumber" },
  { name: "Electrician", icon: "fa-bolt", slug: "electrician" },
  { name: "Gardener", icon: "fa-leaf", slug: "gardener" },
  { name: "Hairdresser", icon: "fa-cut", slug: "hairdresser" },
  { name: "Painter", icon: "fa-paint-brush", slug: "painter" },
  { name: "Spa Treatment", icon: "fa-spa", slug: "spa-treatment" },
]

function Header({ isDarkMode, toggleDarkMode }) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const router = useRouter()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 px-4 lg:px-6 h-14 flex items-center justify-between bg-white dark:bg-gray-800 border-b transition-colors duration-300">
      <Link className="flex items-center justify-center" href="/">
        <span className="sr-only">ProLiink Connect</span>
        <span className="font-bold text-2xl dark:text-white">
          Prol<span className="text-blue-500">i</span>ink Connect
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-4 sm:gap-6">
        <div className="relative">
          <button
            className="text-sm font-medium text-primary hover:text-secondary dark:text-white flex items-center"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            Category <i className="fas fa-chevron-down ml-1"></i>
          </button>
          {isCategoryOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-20">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsCategoryOpen(false)}
                >
                  <i className={`fas ${service.icon} mr-2`}></i>
                  <span>{service.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <button
          className="text-sm font-medium text-primary hover:text-secondary hover:underline underline-offset-4 transition-colors duration-200 dark:text-white"
          onClick={() => scrollToSection("how-it-works")}
        >
          How It Works
        </button>
        <button
          className="text-sm font-medium text-primary hover:text-secondary hover:underline underline-offset-4 transition-colors duration-200 dark:text-white"
          onClick={() => scrollToSection("about")}
        >
          About
        </button>
        <button
          className="text-sm font-medium text-primary hover:text-secondary hover:underline underline-offset-4 transition-colors duration-200 dark:text-white"
          onClick={() => scrollToSection("features")}
        >
          Features
        </button>
        <button
          className="text-sm font-medium text-primary hover:text-secondary hover:underline underline-offset-4 transition-colors duration-200 dark:text-white"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </button>
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="text-primary hover:text-secondary dark:text-white dark:hover:text-secondary px-4 py-2 text-sm font-medium border border-gray-300 rounded transition-colors duration-200"
        >
          Login
        </Link>
        <Link
          href="/demo"
          className="text-primary hover:text-secondary dark:text-white dark:hover:text-secondary px-4 py-2 text-sm font-medium border border-gray-300 rounded transition-colors duration-200"
        >
          Demo
        </Link>
        <div className="relative">
          <button
            className="bg-primary text-white hover:bg-secondary dark:bg-white dark:text-primary dark:hover:bg-gray-200 px-4 py-2 text-sm font-medium rounded transition-colors duration-200"
            onClick={() => setIsRegisterOpen(!isRegisterOpen)}
          >
            Register
          </button>
          {isRegisterOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-20">
              <Link
                href="/register/client"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsRegisterOpen(false)}
              >
                Register as Client
              </Link>
              <Link
                href="/register/contractor"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsRegisterOpen(false)}
              >
                Register as Contractor
              </Link>
            </div>
          )}
        </div>
        <div className="ml-4 flex items-center">
          <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                id="theme-toggle"
                type="checkbox"
                className="sr-only"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner"></div>
              <div
                className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transform ${isDarkMode ? "translate-x-5" : "translate-x-0"} transition-transform duration-300`}
              ></div>
            </div>
            <div className="ml-2 text-gray-700 dark:text-gray-300">
              <i className={`fas ${isDarkMode ? "fa-moon" : "fa-sun"}`}></i>
            </div>
          </label>
        </div>
      </div>
    </header>
  )
}

export default Header
