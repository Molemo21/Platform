"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

function ClientDashboard({ isDarkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState("book")
  const [category, setCategory] = useState("")
  const [service, setService] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [priceRange, setPriceRange] = useState(600)
  const [images, setImages] = useState(null)
  const [location, setLocation] = useState("")
  const router = useRouter()
  const [bookings, setBookings] = useState([
    {
      id: 1,
      category: "Plumbing",
      service: "Pipe Repair",
      jobDescription: "Fix leaky pipe under kitchen sink",
      bookingDate: "2024-03-10",
      bookingTime: "14:00",
      priceRange: 800,
      location: "123 Main St, City",
      status: "Pending",
    },
    {
      id: 2,
      category: "Electrical",
      service: "Wiring Installation",
      jobDescription: "Install new outlets in living room",
      bookingDate: "2024-03-12",
      bookingTime: "10:00",
      priceRange: 1000,
      location: "456 Elm St, Town",
      status: "Approved",
      contractor: {
        name: "John Doe",
        rating: 4.8,
        phone: "+27 123 456 789",
      },
    },
  ])
  const [showReview, setShowReview] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const [completedJobs, setCompletedJobs] = useState([
    {
      id: 1,
      service: "Plumbing",
      description: "Fixed leaky faucet",
      contractor: "John Doe",
      completionDate: "2024-02-15",
      rating: 5,
      review: "Excellent service! Very professional and quick.",
      totalCost: 750,
    },
    {
      id: 2,
      service: "Electrical",
      description: "Installed new light fixtures",
      contractor: "Jane Smith",
      completionDate: "2024-02-10",
      rating: 4,
      review: "Good job, but arrived a bit late.",
      totalCost: 950,
    },
  ])

  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  const categories = [
    "Plumbing",
    "Electrical",
    "Gardening",
    "Cleaning",
    "Painting",
    "Hairdresser",
    "Spa Treatment",
    "Nail Tech",
  ]

  const services = {
    Plumbing: ["Pipe Repair", "Drain Cleaning", "Fixture Installation"],
    Electrical: ["Wiring", "Light Installation", "Circuit Repair"],
    Gardening: ["Lawn Mowing", "Tree Trimming", "Landscaping"],
    Cleaning: ["House Cleaning", "Carpet Cleaning", "Window Washing"],
    Painting: ["Interior Painting", "Exterior Painting", "Wallpaper Installation"],
    Hairdresser: ["Haircut", "Hair Coloring", "Hair Styling", "Hair Treatment"],
    "Spa Treatment": ["Massage", "Facial", "Body Wrap", "Aromatherapy"],
    "Nail Tech": ["Manicure", "Pedicure", "Nail Art", "Gel Nails"],
  }

  const handleProceed = () => {
    setShowReview(true)
  }

  const handleBookingSubmit = () => {
    const newBooking = {
      id: bookings.length + 1,
      category,
      service,
      jobDescription,
      bookingDate: bookingDate === "Instant" ? "Today" : bookingDate,
      bookingTime,
      priceRange,
      location,
      status: "Pending",
    }
    setBookings([...bookings, newBooking])
    // Reset the form
    setCategory("")
    setService("")
    setJobDescription("")
    setBookingDate("")
    setBookingTime("")
    setPriceRange(600)
    setImages(null)
    setLocation("")
    setShowReview(false)
    setShowConfirmation(true)
    setIsSearching(true)
  }

  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => {
        setIsSearching(false)
      }, 5000) // Simulate searching for 5 seconds
      return () => clearTimeout(timer)
    }
  }, [isSearching])

  const handleComplete = (bookingId) => {
    const completedBooking = bookings.find((booking) => booking.id === bookingId)
    if (completedBooking) {
      setCompletedJobs([
        ...completedJobs,
        {
          id: completedBooking.id,
          service: completedBooking.service,
          description: completedBooking.jobDescription,
          contractor: completedBooking.contractor.name,
          completionDate: new Date().toISOString().split("T")[0],
          rating: 0,
          review: "",
          totalCost: completedBooking.priceRange,
        },
      ])
      setBookings(bookings.filter((booking) => booking.id !== bookingId))
    }
  }

  const handlePayment = (job) => {
    setSelectedJob(job)
    setShowPaymentDialog(true)
  }

  const handleCashPayment = () => {
    alert("Cash Payment Selected. Please pay the contractor directly in cash.")
    setCompletedJobs(
      completedJobs.map((job) => (job.id === selectedJob.id ? { ...job, paid: true, paymentMethod: "cash" } : job)),
    )
    setShowPaymentDialog(false)
  }

  const handleCardPayment = () => {
    router.push(`/dashboard/client/payment?jobId=${selectedJob.id}`)
  }

  const handleRating = (jobId, rating) => {
    setCompletedJobs(completedJobs.map((job) => (job.id === jobId ? { ...job, rating } : job)))
  }

  const handleReview = (jobId, review) => {
    setCompletedJobs(completedJobs.map((job) => (job.id === jobId ? { ...job, review } : job)))
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      <aside className="w-64 bg-gradient-to-b from-primary to-secondary p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-white mb-6">Client Dashboard</h1>
        <nav className="space-y-4">
          <button className="w-full flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-home mr-2"></i>
            Home
          </button>
          <button className="w-full flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-calendar mr-2"></i>
            My Bookings
          </button>
          <button className="w-full flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-md">
            <i className="fas fa-file-alt mr-2"></i>
            Service History
          </button>
          <button
            className="w-full flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-md"
            onClick={() => router.push("/dashboard/client/profile")}
          >
            <i className="fas fa-user mr-2"></i>
            Profile
          </button>
        </nav>
        <button
          className="w-full flex items-center text-white hover:bg-white/10 px-4 py-2 rounded-md mt-auto"
          onClick={() => router.push("/login")}
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-primary via-primary to-secondary dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Welcome, Client</h2>
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

        <div className="mb-6">
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "book"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("book")}
            >
              Book a Service
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "bookings"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              My Bookings
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "completed"
                  ? "bg-white text-primary dark:bg-blue-600 dark:text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed Jobs
            </button>
          </div>
        </div>

        <div className={activeTab === "book" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book a Service</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {category && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Select a service</option>
                    {services[category].map((serv) => (
                      <option key={serv} value={serv}>
                        {serv}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Description</label>
                <textarea
                  placeholder="Describe your job specifications"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <input
                  type="text"
                  placeholder="Enter the service location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value === "instant" ? "Instant" : e.target.value)}
                  >
                    <option value="">Select date</option>
                    <option value="instant">Instant (Today)</option>
                    <option value={new Date().toISOString().split("T")[0]}>Custom Date</option>
                  </select>
                  {bookingDate !== "Instant" && bookingDate !== "" && bookingDate !== "instant" && (
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-2"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload Images (optional)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  onChange={(e) => setImages(e.target.files)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Range (R)</label>
                <input
                  type="range"
                  min="600"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number.parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-gray-700 dark:text-gray-300">R{priceRange}</div>
              </div>

              <button
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>

        <div className={activeTab === "bookings" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">My Bookings</h3>
            </div>
            <div className="p-6">
              {bookings.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">You have no current bookings.</p>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{booking.service}</h4>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                              : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Category:</strong> {booking.category}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Description:</strong> {booking.jobDescription}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Location:</strong> {booking.location}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Date:</strong> {booking.bookingDate}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Time:</strong> {booking.bookingTime}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Price Range:</strong> R{booking.priceRange}
                      </p>

                      {booking.status === "Pending" && (
                        <div className="mt-4 flex items-center text-yellow-600 dark:text-yellow-400">
                          <i className="fas fa-clock mr-2 animate-pulse"></i>
                          <span>Waiting for contractor approval</span>
                        </div>
                      )}

                      {booking.status === "Approved" && (
                        <div className="mt-4 space-y-2">
                          <p className="text-gray-700 dark:text-gray-300">
                            <strong>Contractor:</strong> {booking.contractor.name} (Rating: {booking.contractor.rating})
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700">
                              View Contractor
                            </button>
                            <div className="relative inline-block">
                              <button className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
                                Contact
                              </button>
                              <div className="hidden absolute z-10 w-40 bg-white rounded-md shadow-lg dark:bg-gray-800">
                                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                  <i className="fas fa-comment-alt mr-2"></i> Message
                                </button>
                                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                  <i className="fas fa-phone mr-2"></i> Call
                                </button>
                              </div>
                            </div>
                            <button className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
                              <i className="fas fa-map-marker-alt mr-2"></i> Location
                            </button>
                          </div>
                          <button
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                            onClick={() => handleComplete(booking.id)}
                          >
                            Mark as Completed
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={activeTab === "completed" ? "block" : "hidden"}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Completed Jobs</h3>
            </div>
            <div className="p-6">
              {completedJobs.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">You have no completed jobs yet.</p>
              ) : (
                <div className="space-y-4">
                  {completedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{job.service}</h4>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          Completed
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Description:</strong> {job.description}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Contractor:</strong> {job.contractor}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Completion Date:</strong> {job.completionDate}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>Total Cost:</strong> R{job.totalCost}
                      </p>

                      <div className="flex items-center mt-2">
                        <span className="text-gray-700 dark:text-gray-300 mr-2">
                          <strong>Rating:</strong>
                        </span>
                        {[...Array(5)].map((_, index) => (
                          <i
                            key={index}
                            className={`fas fa-star cursor-pointer ${
                              index < job.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
                            }`}
                            onClick={() => handleRating(job.id, index + 1)}
                          ></i>
                        ))}
                      </div>

                      {!job.paid && (
                        <button
                          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                          onClick={() => handlePayment(job)}
                        >
                          Pay R{job.totalCost}
                        </button>
                      )}

                      {job.paid && !job.review && (
                        <div className="mt-4">
                          <textarea
                            placeholder="Leave a review..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-2"
                            onChange={(e) => handleReview(job.id, e.target.value)}
                            rows={3}
                          />
                          <button
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                            onClick={() => alert("Thank you for your feedback!")}
                          >
                            Submit Review
                          </button>
                        </div>
                      )}

                      {job.review && (
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                          <strong>Your Review:</strong> {job.review}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Review Your Booking</h3>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Category:</strong> {category}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Service:</strong> {service}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Job Description:</strong> {jobDescription}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Location:</strong> {location}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Date:</strong> {bookingDate}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Time:</strong> {bookingTime}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Price Range:</strong> R{priceRange}
              </p>
              {images && (
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-white">Images:</strong> {images.length} file(s) uploaded
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                onClick={() => setShowReview(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleBookingSubmit}
              >
                Submit Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 text-center">
            <i className="fas fa-check-circle text-green-500 text-5xl mb-4"></i>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Booking Confirmed</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Your booking request has been sent successfully!</p>
            {isSearching && (
              <div className="flex items-center justify-center text-blue-500 dark:text-blue-400">
                <i className="fas fa-search mr-2 animate-spin"></i>
                <span>Searching for available contractors...</span>
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => setShowConfirmation(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showPaymentDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Select Payment Method</h3>
            <div className="space-y-4">
              <button
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                onClick={handleCashPayment}
              >
                <i className="fas fa-money-bill-wave mr-2"></i> Pay with Cash
              </button>
              <button
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center"
                onClick={handleCardPayment}
              >
                <i className="fas fa-credit-card mr-2"></i> Pay with Card
              </button>
            </div>
            <button
              className="mt-4 w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              onClick={() => setShowPaymentDialog(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientDashboard
