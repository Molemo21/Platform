"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function AdminDashboard({ isDarkMode, toggleDarkMode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("user-management")

  const [platformStats, setPlatformStats] = useState({
    totalUsers: 5000,
    activeContractors: 500,
    completedJobs: 10000,
    totalRevenue: 500000,
    activeDisputes: 15,
    averageRating: 4.7,
  })

  const [recentReviews, setRecentReviews] = useState([
    { id: 1, client: "John Doe", contractor: "Jane Smith", rating: 4, comment: "Great service!" },
    { id: 2, client: "Alice Johnson", contractor: "Bob Wilson", rating: 5, comment: "Excellent work!" },
  ])

  const [disputes, setDisputes] = useState([
    {
      id: 1,
      client: "Emma Watson",
      contractor: "Tom Hardy",
      status: "Open",
      description: "Job not completed as agreed",
    },
    {
      id: 2,
      client: "Chris Evans",
      contractor: "Scarlett Johansson",
      status: "Resolved",
      description: "Payment dispute",
    },
  ])

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", type: "Client", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", type: "Contractor", status: "Active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", type: "Contractor", status: "Pending" },
  ])

  const [serviceCategories, setServiceCategories] = useState([
    { id: 1, name: "Plumbing", basePrice: 500 },
    { id: 2, name: "Electrical", basePrice: 600 },
    { id: 3, name: "Gardening", basePrice: 400 },
  ])

  const [financialData, setFinancialData] = useState({
    monthlyRevenue: [50000, 55000, 60000, 58000, 62000, 65000],
    topEarningCategories: [
      { category: "Plumbing", revenue: 150000 },
      { category: "Electrical", revenue: 120000 },
      { category: "Gardening", revenue: 90000 },
    ],
  })

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    target: "all",
  })

  const handleAnnouncementChange = (e) => {
    const { id, value } = e.target
    setAnnouncementForm({
      ...announcementForm,
      [id]: value,
    })
  }

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault()
    // Handle announcement submission logic here
    console.log("Announcement submitted", announcementForm)
    alert("Announcement sent successfully!")
    setAnnouncementForm({
      title: "",
      content: "",
      target: "all",
    })
  }

  return (
    <div
      className={`flex h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-black text-white ${isDarkMode ? "dark" : ""}`}
    >
      {/* Sidebar */}

      <aside
        className={`bg-gradient-to-b from-purple-900 to-black ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300 ease-in-out dark:bg-gray-800`}
      >
        <div className="p-4">
          <h2 className={`text-2xl font-bold ${isSidebarOpen ? "" : "hidden"}`}>Admin Dashboard</h2>
          <button
            className="mt-4 w-full flex items-center justify-start text-white hover:bg-white/10 px-4 py-2 rounded-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "<<" : ">>"}
          </button>
        </div>
        <nav className="mt-8">
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-chart-bar mr-2"></i>
            {isSidebarOpen && "Dashboard"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-users mr-2"></i>
            {isSidebarOpen && "User Management"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-star mr-2"></i>
            {isSidebarOpen && "Reviews"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {isSidebarOpen && "Disputes"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-dollar-sign mr-2"></i>
            {isSidebarOpen && "Financials"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-tag mr-2"></i>
            {isSidebarOpen && "Categories"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-ad mr-2"></i>
            {isSidebarOpen && "Advertisements"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-comment mr-2"></i>
            {isSidebarOpen && "Announcements"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-cog mr-2"></i>
            {isSidebarOpen && "Settings"}
          </button>
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            className="w-full flex items-center justify-start text-white hover:bg-white/10 px-4 py-2 rounded-md"
            onClick={() => router.push("/login")}
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            {isSidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-primary via-primary to-secondary dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Total Users</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{platformStats.totalUsers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Active Contractors</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{platformStats.activeContractors}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Completed Jobs</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{platformStats.completedJobs}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Total Revenue</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">R{platformStats.totalRevenue}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Active Disputes</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{platformStats.activeDisputes}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Average Rating</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{platformStats.averageRating}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "user-management"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("user-management")}
            >
              User Management
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "reviews"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "disputes"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("disputes")}
            >
              Disputes
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "financials"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("financials")}
            >
              Financials
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "categories"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("categories")}
            >
              Categories
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "advertisements"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("advertisements")}
            >
              Advertisements
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "announcements"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("announcements")}
            >
              Announcements
            </button>
          </div>
        </div>

        <div className={activeTab === "user-management" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <select className="w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="all">All Users</option>
                    <option value="clients">Clients</option>
                    <option value="contractors">Contractors</option>
                  </select>
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700">
                    Search
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {user.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-primary-light dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                              Deactivate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={activeTab === "reviews" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Reviews</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <p className="font-bold text-gray-900 dark:text-white">
                      {review.client} → {review.contractor}
                    </p>
                    <div className="flex items-center mt-2">
                      <strong className="text-gray-600 dark:text-gray-300 mr-2">Rating:</strong>
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${
                            index < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{review.comment}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={activeTab === "disputes" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Disputes</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div
                    key={dispute.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <p className="font-bold text-gray-900 dark:text-white">
                      {dispute.client} vs {dispute.contractor}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Status:</strong> {dispute.status}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Description:</strong> {dispute.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700">
                        Review
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Resolve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={activeTab === "financials" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Financial Overview</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Monthly Revenue</h3>
                  <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                    <p className="text-gray-600 dark:text-gray-300">Revenue chart will be displayed here</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Top Earning Categories</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                            Revenue
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {financialData.topEarningCategories.map((category, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {category.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              R{category.revenue}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Payout Management</h3>
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700">
                    Process Payouts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={activeTab === "categories" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Service Categories</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700">
                  Add New Category
                </button>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Category Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Base Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {serviceCategories.map((category) => (
                        <tr key={category.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {category.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            R{category.basePrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-primary-light dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={activeTab === "advertisements" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Advertisement Management</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700">
                  Create New Ad Campaign
                </button>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Campaign Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Start Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          End Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          Summer Promo
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          2024-06-01
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          2024-08-31
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary-light dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                            Edit
                          </button>
                          <button className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300">
                            Pause
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          Holiday Special
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          2024-12-01
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          2024-12-31
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                            Scheduled
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary-light dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                            Edit
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                            Activate
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={activeTab === "announcements" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Announcement</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="title"
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={announcementForm.title}
                      onChange={handleAnnouncementChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="content"
                      rows="3"
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={announcementForm.content}
                      onChange={handleAnnouncementChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label htmlFor="target" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Target Audience
                  </label>
                  <select
                    id="target"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={announcementForm.target}
                    onChange={handleAnnouncementChange}
                  >
                    <option value="all">All Users</option>
                    <option value="clients">Clients Only</option>
                    <option value="contractors">Contractors Only</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Send Announcement
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
