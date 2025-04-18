"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

function ContactPage({ isDarkMode, toggleDarkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Show confirmation message
    setShowConfirmation(true)
    // Reset form data
    setFormData({ name: "", email: "", message: "" })
    // Hide confirmation after 3 seconds
    setTimeout(() => setShowConfirmation(false), 3000)
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 py-12 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={6}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      <Footer />

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex items-center">
            <i className="fas fa-check-circle text-green-500 text-xl mr-2"></i>
            <p className="text-gray-800 dark:text-white">Message sent successfully!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactPage
