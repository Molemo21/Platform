"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"

function LoginPage({ isDarkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState("email")
  const [isContractor, setIsContractor] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    if (isAdmin) {
      router.push("/dashboard/admin")
    } else if (isContractor) {
      router.push("/dashboard/contractor")
    } else {
      router.push("/dashboard/client")
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-primary to-secondary dark:from-gray-800 dark:to-gray-900">
        <div className="w-full max-w-md space-y-8 px-4 py-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Login to Your Account</h1>
            <p className="text-gray-200">Enter your email or phone number to login</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                className={`py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "email"
                    ? "bg-primary text-white dark:bg-blue-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab("email")}
              >
                Email
              </button>
              <button
                className={`py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "phone"
                    ? "bg-primary text-white dark:bg-blue-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => setActiveTab("phone")}
              >
                Phone
              </button>
            </div>

            {activeTab === "email" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="contractor"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:border-gray-600"
                    checked={isContractor}
                    onChange={() => {
                      setIsContractor(!isContractor)
                      setIsAdmin(false)
                    }}
                  />
                  <label htmlFor="contractor" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    I am a contractor
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="admin"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:border-gray-600"
                    checked={isAdmin}
                    onChange={() => {
                      setIsAdmin(!isAdmin)
                      setIsContractor(false)
                    }}
                  />
                  <label htmlFor="admin" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    I am an admin
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password-phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    id="password-phone"
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="contractor-phone"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:border-gray-600"
                    checked={isContractor}
                    onChange={() => {
                      setIsContractor(!isContractor)
                      setIsAdmin(false)
                    }}
                  />
                  <label htmlFor="contractor-phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    I am a contractor
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="admin-phone"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:border-gray-600"
                    checked={isAdmin}
                    onChange={() => {
                      setIsAdmin(!isAdmin)
                      setIsContractor(false)
                    }}
                  />
                  <label htmlFor="admin-phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    I am an admin
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Login
                </button>
              </form>
            )}

            <div className="text-center mt-4">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline dark:text-blue-400">
                Forgot password?
              </Link>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Don't have an account?{" "}
                <Link href="/register/client" className="text-primary hover:underline dark:text-blue-400">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage
