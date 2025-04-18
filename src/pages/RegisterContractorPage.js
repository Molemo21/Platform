"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

const serviceCategories = [
  { value: "skilled", label: "Skilled Trades (Plumber, Electrician, Roofer, Builder)" },
  { value: "general", label: "General Services (Hairdresser, Gardener, Cleaner, Handyman, Painter)" },
  { value: "technical", label: "Technical Services (IT Technician, CCTV Installer, Appliance Repair)" },
]

function RegisterContractorPage({ isDarkMode, toggleDarkMode }) {
  const [step, setStep] = useState(1)
  const [serviceType, setServiceType] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    profilePicture: null,
    certificate: null,
    experience: "",
    portfolio: [],
    showcase: [],
    bio: "",
    termsAgreed: false,
    kyc: null,
  })

  const handleChange = (e) => {
    const { id, value, files, type, checked } = e.target

    if (type === "file") {
      if (id === "portfolio" || id === "showcase") {
        setFormData({ ...formData, [id]: Array.from(files) })
      } else {
        setFormData({ ...formData, [id]: files[0] })
      }
    } else if (type === "checkbox") {
      setFormData({ ...formData, [id]: checked })
    } else {
      setFormData({ ...formData, [id]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    window.location.href = "/login"
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                placeholder="John Doe"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Business Name (Optional)
              </label>
              <input
                id="businessName"
                placeholder="John's Plumbing"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
              />
            </div>

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
                value={formData.phone}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Service Area
              </label>
              <input
                id="location"
                placeholder="New York City"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Profile Picture
              </label>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="service-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                What service do you provide?
              </label>
              <select
                id="service-category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a service category
                </option>
                {serviceCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => setStep(3)}
              disabled={!serviceType}
            >
              Next
            </button>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            {(serviceType === "skilled" || serviceType === "technical") && (
              <>
                <div className="space-y-2">
                  <label htmlFor="certificate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Trade Certificate / Business Registration (Required)
                  </label>
                  <input
                    id="certificate"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Years of Experience
                  </label>
                  <input
                    id="experience"
                    type="number"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Portfolio (Optional)
                  </label>
                  <input
                    id="portfolio"
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {serviceType === "general" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="showcase" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Would you like to showcase your work?
                  </label>
                  <input
                    id="showcase"
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Short bio about your skills
                  </label>
                  <textarea
                    id="bio"
                    placeholder="Tell us about your skills and experience"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <label htmlFor="terms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Terms & Conditions
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="termsAgreed"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:border-gray-600"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                />
                <label htmlFor="termsAgreed" className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="kyc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                KYC (Required: ID Upload for Trust & Safety)
              </label>
              <input
                id="kyc"
                type="file"
                accept="image/*"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleSubmit}
            >
              {serviceType === "general" ? "Submit for Instant Activation" : "Submit for Review"}
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-900 dark:to-green-900">
        <div className="w-full max-w-md space-y-8 px-4 py-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Register as a Contractor</h1>
            <p className="text-gray-200">Create your account to offer your services</p>
          </div>

          <form className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
            {renderStep()}

            {step > 1 && (
              <button
                className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 mt-4"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}

            <div className="text-center mt-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline dark:text-blue-400">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RegisterContractorPage
