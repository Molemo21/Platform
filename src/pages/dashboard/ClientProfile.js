"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function ClientProfile({ isDarkMode, toggleDarkMode }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
    address: "123 Main St, City, Country",
  })

  const handlePersonalInfoChange = (e) => {
    const { id, value } = e.target
    setPersonalInfo({
      ...personalInfo,
      [id]: value,
    })
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Handle saving profile information
    console.log("Profile saved", personalInfo)
    alert("Profile information saved successfully!")
  }

  const handleAddCard = (e) => {
    e.preventDefault()
    // Handle adding card details
    console.log("Card added", { cardNumber, expiryDate, cvv })
    alert("Card added successfully!")
    setCardNumber("")
    setExpiryDate("")
    setCvv("")
  }

  return (
    <div className={`flex h-screen bg-gradient-to-br from-primary to-secondary ${isDarkMode ? "dark" : ""}`}>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-md"
            onClick={() => router.push("/dashboard/client")}
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Dashboard
          </button>
          <div className="flex items-center space-x-2">
            <i className="fas fa-sun text-white"></i>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="sr-only"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <label
                htmlFor="toggle"
                className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${isDarkMode ? "bg-blue-600" : ""}`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in ${isDarkMode ? "translate-x-4" : "translate-x-0"}`}
                ></span>
              </label>
            </div>
            <i className="fas fa-moon text-white"></i>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-white">My Profile</h1>

        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "personal"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Information
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "payment"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("payment")}
            >
              Payment Methods
            </button>
          </div>
        </div>

        <div className={activeTab === "personal" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Personal Information</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={activeTab === "payment" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Payment Method</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddCard} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Expiry Date
                    </label>
                    <input
                      id="expiryDate"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Add Card
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ClientProfile
