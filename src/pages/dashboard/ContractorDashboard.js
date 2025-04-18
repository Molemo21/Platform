"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function ContractorDashboard({ isDarkMode, toggleDarkMode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("notifications")

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      clientName: "John Doe",
      service: "Plumbing",
      description: "Fix leaky faucet",
      date: "2024-03-01",
      time: "14:00",
      priceRange: "R600 - R800",
      status: "Pending",
      location: "123 Main St, City",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      service: "Electrical",
      description: "Install new light fixture",
      date: "2024-03-02",
      time: "10:00",
      priceRange: "R800 - R1000",
      status: "Pending",
      location: "456 Elm St, Town",
    },
    {
      id: 3,
      clientName: "Alice Johnson",
      service: "Plumbing",
      description: "Unclog kitchen sink",
      date: "Instant",
      time: "As soon as possible",
      priceRange: "R700 - R900",
      status: "Pending",
      location: "789 Oak St, Village",
    },
  ])

  const [activeJobs, setActiveJobs] = useState([
    {
      id: 1,
      clientName: "Bob Wilson",
      service: "Plumbing",
      description: "Replace bathroom sink",
      date: "2024-03-05",
      time: "09:00",
      priceRange: "R1000 - R1200",
      status: "In Progress",
      location: "321 Pine St, Suburb",
    },
  ])

  const [completedJobs, setCompletedJobs] = useState([
    {
      id: 1,
      clientName: "Emma Watson",
      service: "Plumbing",
      description: "Fixed leaky faucet",
      completionDate: "2024-02-15",
      rating: 5,
      review: "Excellent service! Very professional and quick.",
    },
    {
      id: 2,
      clientName: "Tom Hardy",
      service: "Electrical",
      description: "Installed new light fixtures",
      completionDate: "2024-02-10",
      rating: 4,
      review: "Good job, but arrived a bit late.",
    },
  ])

  const handleAccept = (id) => {
    const acceptedJob = notifications.find((n) => n.id === id)
    setActiveJobs([...activeJobs, { ...acceptedJob, status: "Accepted" }])
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleDecline = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleComplete = (id) => {
    setActiveJobs(activeJobs.map((job) => (job.id === id ? { ...job, status: "Completed" } : job)))
  }

  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [statusNotes, setStatusNotes] = useState("")

  const openStatusDialog = (job) => {
    setSelectedJob(job)
    setShowStatusDialog(true)
  }

  const handleStatusUpdate = () => {
    handleComplete(selectedJob.id)
    setShowStatusDialog(false)
    setStatusNotes("")
  }

  return (
    <div
      className={`flex h-screen bg-gradient-to-br from-primary via-primary to-secondary text-white ${isDarkMode ? "dark" : ""}`}
    >
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-primary to-secondary ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300 ease-in-out dark:bg-gray-800`}
      >
        <div className="p-4">
          <h2 className={`text-2xl font-bold ${isSidebarOpen ? "" : "hidden"}`}>ProLiink Connect</h2>
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
            <i className="fas fa-calendar mr-2"></i>
            {isSidebarOpen && "Appointments"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-dollar-sign mr-2"></i>
            {isSidebarOpen && "Earnings"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-users mr-2"></i>
            {isSidebarOpen && "Clients"}
          </button>
          <button className="w-full flex items-center justify-start mb-2 text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-bell mr-2"></i>
            {isSidebarOpen && "Notifications"}
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
          <h1 className="text-3xl font-bold text-white">Contractor Dashboard</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-primary text-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Total Earnings</h2>
            <p className="text-3xl font-bold">R12,345</p>
          </div>
          <div className="bg-secondary text-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Completed Jobs</h2>
            <p className="text-3xl font-bold">87</p>
          </div>
          <div className="bg-primary text-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Active Clients</h2>
            <p className="text-3xl font-bold">32</p>
          </div>
          <div className="bg-secondary text-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">Rating</h2>
            <p className="text-3xl font-bold">4.8</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "notifications"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              New Job Requests
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "active-jobs"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("active-jobs")}
            >
              Active Jobs
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "completed-jobs"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("completed-jobs")}
            >
              Completed Jobs
            </button>
          </div>
        </div>

        <div className={activeTab === "notifications" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Job Requests</h2>
            </div>
            <div className="p-6">
              {notifications.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">No new job requests at the moment.</p>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <h3 className="font-bold text-gray-900 dark:text-white">{notification.clientName}</h3>
                      <p className="text-gray-600 dark:text-gray-300">Service: {notification.service}</p>
                      <p className="text-gray-600 dark:text-gray-300">Description: {notification.description}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Date: {notification.date} at {notification.time}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">Price Range: {notification.priceRange}</p>
                      <p className="text-gray-600 dark:text-gray-300">Location: {notification.location}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          onClick={() => handleAccept(notification.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
                          onClick={() => handleDecline(notification.id)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={activeTab === "active-jobs" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Jobs</h2>
            </div>
            <div className="p-6">
              {activeJobs.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">No active jobs at the moment.</p>
              ) : (
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <h3 className="font-bold text-gray-900 dark:text-white">{job.clientName}</h3>
                      <p className="text-gray-600 dark:text-gray-300">Service: {job.service}</p>
                      <p className="text-gray-600 dark:text-gray-300">Description: {job.description}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Date: {job.date} at {job.time}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">Price Range: {job.priceRange}</p>
                      <p className="text-gray-600 dark:text-gray-300">Location: {job.location}</p>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            job.status === "Accepted"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                          onClick={() => openStatusDialog(job)}
                        >
                          Update Status
                        </button>
                        {job.status === "Accepted" && (
                          <button className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500">
                            Contact Client
                          </button>
                        )}
                        {job.status === "Accepted" && (
                          <button className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            Location
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={activeTab === "completed-jobs" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Completed Jobs</h2>
            </div>
            <div className="p-6">
              {completedJobs.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">No completed jobs yet.</p>
              ) : (
                <div className="space-y-4">
                  {completedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">{job.service}</h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          Completed
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        <strong>Client:</strong> {job.clientName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <strong>Description:</strong> {job.description}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <strong>Completion Date:</strong> {job.completionDate}
                      </p>
                      <div className="flex items-center mt-2">
                        <strong className="text-gray-600 dark:text-gray-300 mr-2">Rating:</strong>
                        {[...Array(5)].map((_, index) => (
                          <i
                            key={index}
                            className={`fas fa-star ${
                              index < job.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
                            }`}
                          ></i>
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        <strong>Review:</strong> {job.review}
                      </p>
                      <button className="mt-4 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500">
                        <i className="fas fa-thumbs-up mr-2"></i>
                        Thank Client
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Status Update Dialog */}
      {showStatusDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Update Job Status</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                onClick={() => setShowStatusDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleStatusUpdate}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContractorDashboard
