"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import {
  CheckCircle,
  Clock,
  Star,
  MessageCircle,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"

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

// Sample contractor data
const contractorProfiles = {
  Plumbing: [
    {
      id: 1,
      name: "John Smith",
      profileImage: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 124,
      experience: "10+ years",
      hourlyRate: 650,
      description:
        "Specialized in residential and commercial plumbing with expertise in pipe repairs and installations.",
      workImages: [
        "/placeholder.svg?height=150&width=200&text=Pipe+Repair",
        "/placeholder.svg?height=150&width=200&text=Sink+Installation",
        "/placeholder.svg?height=150&width=200&text=Bathroom+Renovation",
      ],
      availability: "Available today",
    },
    {
      id: 2,
      name: "Michael Johnson",
      profileImage: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 98,
      experience: "8 years",
      hourlyRate: 600,
      description: "Specializing in emergency plumbing repairs and drain cleaning services.",
      workImages: [
        "/placeholder.svg?height=150&width=200&text=Drain+Cleaning",
        "/placeholder.svg?height=150&width=200&text=Leak+Repair",
        "/placeholder.svg?height=150&width=200&text=Water+Heater",
      ],
      availability: "Available tomorrow",
    },
    {
      id: 3,
      name: "David Williams",
      profileImage: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 87,
      experience: "12 years",
      hourlyRate: 700,
      description: "Master plumber with expertise in complex installations and commercial projects.",
      workImages: [
        "/placeholder.svg?height=150&width=200&text=Commercial+Plumbing",
        "/placeholder.svg?height=150&width=200&text=Industrial+Pipes",
        "/placeholder.svg?height=150&width=200&text=System+Design",
      ],
      availability: "Available in 2 days",
    },
    {
      id: 4,
      name: "Robert Brown",
      profileImage: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 65,
      experience: "7 years",
      hourlyRate: 620,
      description: "Specializing in bathroom and kitchen renovations with plumbing expertise.",
      workImages: [
        "/placeholder.svg?height=150&width=200&text=Kitchen+Plumbing",
        "/placeholder.svg?height=150&width=200&text=Bathroom+Fixtures",
        "/placeholder.svg?height=150&width=200&text=Shower+Installation",
      ],
      availability: "Available today",
    },
    {
      id: 5,
      name: "James Davis",
      profileImage: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 52,
      experience: "5 years",
      hourlyRate: 580,
      description: "Affordable and reliable plumbing services with a focus on customer satisfaction.",
      workImages: [
        "/placeholder.svg?height=150&width=200&text=Toilet+Repair",
        "/placeholder.svg?height=150&width=200&text=Faucet+Installation",
        "/placeholder.svg?height=150&width=200&text=Pipe+Insulation",
      ],
      availability: "Available in 3 days",
    },
    {
      id: 6,
      name: "Thomas Wilson",
      profileImage: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 112,
      experience: "15 years",
      hourlyRate: 750,
      description: "Master plumber specializing in high-end residential installations and repairs.",
      workImages: [
        "/placeholder.svg?height=150&width=200&text=Luxury+Bathroom",
        "/placeholder.svg?height=150&width=200&text=Custom+Kitchen",
        "/placeholder.svg?height=150&width=200&text=Outdoor+Plumbing",
      ],
      availability: "Available tomorrow",
    },
    {
      id: 7,
      name: "Charles Miller",
      profileImage: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 78,
      experience: "9 years",
      hourlyRate: 630,
      description: "Specializing in water heater installations and maintenance.",
      workImages: [
        "/placeholder.svg?height=150&width=200&text=Water+Heater+Install",
        "/placeholder.svg?height=150&width=200&text=Tankless+Systems",
        "/placeholder.svg?height=150&width=200&text=Maintenance",
      ],
      availability: "Available today",
    },
    {
      id: 8,
      name: "Daniel Taylor",
      profileImage: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 91,
      experience: "11 years",
      hourlyRate: 680,
      description: "Expert in sewer line repairs and replacements with modern techniques.",
      workImages: [
        "/placeholder.svg?height=150&width=200&text=Sewer+Line",
        "/placeholder.svg?height=150&width=200&text=Trenchless+Repair",
        "/placeholder.svg?height=150&width=200&text=Drain+Cleaning",
      ],
      availability: "Available in 2 days",
    },
  ],
  Electrical: [
    // Similar structure for electrical contractors
    {
      id: 9,
      name: "Sarah Johnson",
      profileImage: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 135,
      experience: "12 years",
      hourlyRate: 680,
      description: "Master electrician specializing in residential and commercial electrical installations.",
      workImages: [
        "/placeholder.svg?height=150&width=200&text=Panel+Upgrade",
        "/placeholder.svg?height=150&width=200&text=Lighting+Installation",
        "/placeholder.svg?height=150&width=200&text=Wiring",
      ],
      availability: "Available today",
    },
    // More electrical contractors...
  ],
  // Other service categories...
}

export default function ClientDashboard() {
  const searchParams = useSearchParams()
  const [category, setCategory] = useState("")
  const [service, setService] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [priceRange, setPriceRange] = useState([600])
  const [images, setImages] = useState<FileList | null>(null)
  const [location, setLocation] = useState("")
  const [showReview, setShowReview] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [bookingStep, setBookingStep] = useState("form") // "form", "contractors", "summary"
  const [currentContractorPage, setCurrentContractorPage] = useState(0)
  const [selectedContractor, setSelectedContractor] = useState(null)
  const [activeTab, setActiveTab] = useState("book")

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

  // Check for URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const serviceParam = searchParams.get("service")
    const searchParam = searchParams.get("search")

    if (categoryParam) {
      // Find the matching category
      const matchedCategory = categories.find((cat) => cat.toLowerCase() === categoryParam.toLowerCase())
      if (matchedCategory) {
        setCategory(matchedCategory)
        setActiveTab("book")
      }
    }

    if (serviceParam) {
      // Find the matching service
      for (const [cat, serviceList] of Object.entries(services)) {
        const matchedService = serviceList.find((serv) => serv.toLowerCase() === serviceParam.toLowerCase())
        if (matchedService) {
          setCategory(cat)
          setService(matchedService)
          setActiveTab("book")
          break
        }
      }
    }

    if (searchParam) {
      // Check if search matches a category
      const matchedCategory = categories.find((cat) => cat.toLowerCase().includes(searchParam.toLowerCase()))
      if (matchedCategory) {
        setCategory(matchedCategory)
        setActiveTab("book")
        return
      }

      // Check if search matches a service
      for (const [cat, serviceList] of Object.entries(services)) {
        const matchedService = serviceList.find((serv) => serv.toLowerCase().includes(searchParam.toLowerCase()))
        if (matchedService) {
          setCategory(cat)
          setService(matchedService)
          setActiveTab("book")
          return
        }
      }
    }
  }, [searchParams])

  const handleProceed = () => {
    // Instead of showing review dialog, go to contractor selection
    setBookingStep("contractors")
  }

  const handleBookingSubmit = () => {
    const newBooking = {
      id: bookings.length + 1,
      category,
      service,
      jobDescription,
      bookingDate: bookingDate === "Instant" ? "Today" : bookingDate,
      bookingTime,
      priceRange: priceRange[0],
      location,
      status: "Pending",
      contractor: selectedContractor
        ? {
            name: selectedContractor.name,
            rating: selectedContractor.rating,
            phone: "+27 123 456 789", // Sample phone
          }
        : null,
    }
    setBookings([...bookings, newBooking])
    // Reset the form
    setCategory("")
    setService("")
    setJobDescription("")
    setBookingDate("")
    setBookingTime("")
    setPriceRange([600])
    setImages(null)
    setLocation("")
    setBookingStep("form")
    setSelectedContractor(null)
    setCurrentContractorPage(0)
    setShowConfirmation(true)

    // Simulate searching for 5 seconds
    setTimeout(() => {
      setShowConfirmation(false)
    }, 5000)
  }

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
    toast({
      title: "Cash Payment Selected",
      description: "Please pay the contractor directly in cash.",
    })
    setCompletedJobs(
      completedJobs.map((job) => (job.id === selectedJob.id ? { ...job, paid: true, paymentMethod: "cash" } : job)),
    )
    setShowPaymentDialog(false)
  }

  const handleCardPayment = () => {
    window.location.href = `/dashboard/client/payment?jobId=${selectedJob.id}`
  }

  const handleRating = (jobId, rating) => {
    setCompletedJobs(completedJobs.map((job) => (job.id === jobId ? { ...job, rating } : job)))
  }

  const handleReview = (jobId, review) => {
    setCompletedJobs(completedJobs.map((job) => (job.id === jobId ? { ...job, review } : job)))
  }

  const handleSelectContractor = (contractor) => {
    setSelectedContractor(contractor)
    setBookingStep("summary")
  }

  const handleBackToContractors = () => {
    setSelectedContractor(null)
    setBookingStep("contractors")
  }

  const handleBackToForm = () => {
    setBookingStep("form")
    setSelectedContractor(null)
    setCurrentContractorPage(0)
  }

  // Get contractors for the selected category
  const availableContractors = category ? contractorProfiles[category] || [] : []

  // Pagination for contractors - show 4 at a time
  const contractorsPerPage = 4
  const totalPages = Math.ceil(availableContractors.length / contractorsPerPage)
  const currentContractors = availableContractors.slice(
    currentContractorPage * contractorsPerPage,
    (currentContractorPage + 1) * contractorsPerPage,
  )

  const nextContractorPage = () => {
    if (currentContractorPage < totalPages - 1) {
      setCurrentContractorPage(currentContractorPage + 1)
    }
  }

  const prevContractorPage = () => {
    if (currentContractorPage > 0) {
      setCurrentContractorPage(currentContractorPage - 1)
    }
  }

  return (
    <DashboardSidebar userType="client">
      <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-white">Welcome, Client</h2>
          </div>
        </div>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="book" className="text-white dark:text-gray-200">
              Book a Service
            </TabsTrigger>
            <TabsTrigger value="bookings" id="bookings" className="text-white dark:text-gray-200">
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="completed" id="completed" className="text-white dark:text-gray-200">
              Completed Jobs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="book">
            {bookingStep === "form" && (
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-primary dark:text-white">Book a Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={(value) => setCategory(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {category && (
                        <div className="space-y-2">
                          <Label htmlFor="service">Service</Label>
                          <Select value={service} onValueChange={(value) => setService(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services[category].map((serv) => (
                                <SelectItem key={serv} value={serv}>
                                  {serv}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="jobDescription">Job Description</Label>
                        <Textarea
                          id="jobDescription"
                          placeholder="Describe your job specifications"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="Enter the service location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Select onValueChange={(value) => setBookingDate(value === "instant" ? "Instant" : value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select date" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="instant">Instant (Today)</SelectItem>
                              <SelectItem value={new Date().toISOString().split("T")[0]}>Custom Date</SelectItem>
                            </SelectContent>
                          </Select>
                          {bookingDate !== "Instant" && (
                            <Input
                              id="date"
                              type="date"
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                            />
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="images">Upload Images (optional)</Label>
                        <Input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => setImages(e.target.files)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price-range">Price Range (R)</Label>
                        <Slider
                          id="price-range"
                          min={600}
                          max={10000}
                          step={100}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="text-primary dark:text-white"
                        />
                        <div className="text-right">R{priceRange[0]}</div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-6"
                    onClick={handleProceed}
                    disabled={!category || !service || !jobDescription || !location || !bookingDate || !bookingTime}
                  >
                    Find Contractors
                  </Button>
                </CardContent>
              </Card>
            )}

            {bookingStep === "contractors" && (
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-primary dark:text-white">Choose a Contractor</CardTitle>
                    <CardDescription>Select a contractor for your {service} service</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleBackToForm}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Details
                  </Button>
                </CardHeader>
                <CardContent>
                  {currentContractors.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        No contractors available for this service category.
                      </p>
                      <Button onClick={handleBackToForm}>Go Back</Button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentContractors.map((contractor) => (
                          <motion.div
                            key={contractor.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card className="h-full hover:shadow-lg transition-shadow">
                              <CardHeader className="pb-2">
                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-4">
                                    <img
                                      src={contractor.profileImage || "/placeholder.svg"}
                                      alt={contractor.name}
                                      className="w-20 h-20 rounded-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <CardTitle>{contractor.name}</CardTitle>
                                    <div className="flex items-center mt-1">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(contractor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                          />
                                        ))}
                                      </div>
                                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                        {contractor.rating} ({contractor.reviews} reviews)
                                      </span>
                                    </div>
                                    <div className="mt-1 text-sm">
                                      <Badge variant="outline" className="mr-2">
                                        {contractor.experience}
                                      </Badge>
                                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        {contractor.availability}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                  {contractor.description}
                                </p>
                                <p className="font-medium mb-3">Rate: R{contractor.hourlyRate}/hour</p>
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                  {contractor.workImages.map((img, index) => (
                                    <img
                                      key={index}
                                      src={img || "/placeholder.svg"}
                                      alt={`Work sample ${index + 1}`}
                                      className="w-full h-24 object-cover rounded-md"
                                    />
                                  ))}
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button className="w-full" onClick={() => handleSelectContractor(contractor)}>
                                  Select Contractor
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>

                      {/* Pagination controls */}
                      {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                          <Button variant="outline" onClick={prevContractorPage} disabled={currentContractorPage === 0}>
                            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                          </Button>
                          <span className="text-sm text-gray-500">
                            Page {currentContractorPage + 1} of {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            onClick={nextContractorPage}
                            disabled={currentContractorPage >= totalPages - 1}
                          >
                            Next <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {bookingStep === "summary" && selectedContractor && (
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-primary dark:text-white">Booking Summary</CardTitle>
                    <CardDescription>Review your booking details before confirming</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleBackToContractors}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Contractors
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Service Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Category:</span>
                          <span className="font-medium">{category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Service:</span>
                          <span className="font-medium">{service}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Date:</span>
                          <span className="font-medium">{bookingDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Time:</span>
                          <span className="font-medium">{bookingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Location:</span>
                          <span className="font-medium">{location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Budget:</span>
                          <span className="font-medium">R{priceRange[0]}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-300 block mb-1">Description:</span>
                          <p className="font-medium">{jobDescription}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Selected Contractor</h3>
                      <div className="flex items-center mb-4">
                        <img
                          src={selectedContractor.profileImage || "/placeholder.svg"}
                          alt={selectedContractor.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{selectedContractor.name}</h4>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(selectedContractor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                              {selectedContractor.rating} ({selectedContractor.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Experience:</span>
                          <span className="font-medium">{selectedContractor.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Rate:</span>
                          <span className="font-medium">R{selectedContractor.hourlyRate}/hour</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Availability:</span>
                          <span className="font-medium">{selectedContractor.availability}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className="text-gray-600 dark:text-gray-300 block mb-2">Work Samples:</span>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedContractor.workImages.map((img, index) => (
                            <img
                              key={index}
                              src={img || "/placeholder.svg"}
                              alt={`Work sample ${index + 1}`}
                              className="w-full h-20 object-cover rounded-md"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button className="w-full" onClick={handleBookingSubmit}>
                      Confirm Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Bookings Tab Content */}
          <TabsContent value="bookings">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-white">My Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p>You have no current bookings.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="flex justify-between items-center">
                            {booking.service}
                            <Badge variant={booking.status === "Pending" ? "secondary" : "success"}>
                              {booking.status}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          <div className="space-y-2 mb-4">
                            <p>
                              <strong>Category:</strong> {booking.category}
                            </p>
                            <p>
                              <strong>Description:</strong> {booking.jobDescription}
                            </p>
                            <p>
                              <strong>Location:</strong> {booking.location}
                            </p>
                            <p>
                              <strong>Date:</strong> {booking.bookingDate}
                            </p>
                            <p>
                              <strong>Time:</strong> {booking.bookingTime}
                            </p>
                            <p>
                              <strong>Price Range:</strong> R{booking.priceRange}
                            </p>
                          </div>
                          {booking.status === "Pending" && (
                            <div className="mt-auto flex items-center text-yellow-500">
                              <Clock className="mr-2 animate-pulse" />
                              <span>Waiting for contractor approval</span>
                            </div>
                          )}
                          {booking.status === "Approved" && (
                            <div className="mt-auto space-y-2">
                              <p>
                                <strong>Contractor:</strong> {booking.contractor.name} (Rating:{" "}
                                {booking.contractor.rating})
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    toast({ title: "Contractor Profile", description: "Viewing contractor profile..." })
                                  }
                                >
                                  View Contractor
                                </Button>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      Contact
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-40">
                                    <div className="flex flex-col space-y-2">
                                      <Button
                                        size="sm"
                                        onClick={() =>
                                          toast({ title: "Messaging", description: "Opening messaging interface..." })
                                        }
                                      >
                                        <MessageCircle className="mr-2 h-4 w-4" /> Message
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() =>
                                          toast({
                                            title: "Calling",
                                            description: `Calling ${booking.contractor.phone}...`,
                                          })
                                        }
                                      >
                                        <Phone className="mr-2 h-4 w-4" /> Call
                                      </Button>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    toast({ title: "Location", description: "Opening map to contractor's location..." })
                                  }
                                >
                                  <MapPin className="mr-2 h-4 w-4" /> Location
                                </Button>
                              </div>
                              <Button className="w-full" onClick={() => handleComplete(booking.id)}>
                                Mark as Completed
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completed Jobs Tab Content */}
          <TabsContent value="completed">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-white">Completed Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                {completedJobs.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-300">You have no completed jobs yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {completedJobs.map((job) => (
                      <Card key={job.id} className="bg-gray-50 dark:bg-gray-700 h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-primary dark:text-white flex justify-between items-center">
                            {job.service}
                            <Badge variant="success">Completed</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                          <div className="space-y-2 mb-4">
                            <p className="text-gray-600 dark:text-gray-300">
                              <strong>Description:</strong> {job.description}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              <strong>Contractor:</strong> {job.contractor}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              <strong>Completion Date:</strong> {job.completionDate}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              <strong>Total Cost:</strong> R{job.totalCost}
                            </p>
                          </div>
                          <div className="mt-auto">
                            <div className="flex items-center mt-2">
                              <strong className="text-gray-600 dark:text-gray-300 mr-2">Rating:</strong>
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`h-5 w-5 cursor-pointer ${index < job.rating ? "text-yellow-400" : "text-gray-300"}`}
                                  fill={index < job.rating ? "currentColor" : "none"}
                                  onClick={() => handleRating(job.id, index + 1)}
                                />
                              ))}
                            </div>
                            {!job.paid && (
                              <Button className="w-full mt-4" onClick={() => handlePayment(job)}>
                                Pay R{job.totalCost}
                              </Button>
                            )}
                            {job.paid && !job.review && (
                              <div className="mt-4">
                                <Textarea
                                  placeholder="Leave a review..."
                                  className="mb-2"
                                  onChange={(e) => handleReview(job.id, e.target.value)}
                                />
                                <Button
                                  className="w-full"
                                  onClick={() =>
                                    toast({ title: "Review Submitted", description: "Thank you for your feedback!" })
                                  }
                                >
                                  Submit Review
                                </Button>
                              </div>
                            )}
                            {job.review && (
                              <p className="mt-4 text-gray-600 dark:text-gray-300">
                                <strong>Your Review:</strong> {job.review}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      {showConfirmation && (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Booking Confirmed</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Your booking request has been sent successfully!
              </p>
              <p className="text-center text-gray-600 dark:text-gray-300">
                {selectedContractor
                  ? `${selectedContractor.name} will be notified of your booking request.`
                  : "We'll notify you once a contractor accepts your request."}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Payment method selection dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Select Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button className="w-full" onClick={handleCashPayment}>
              <Banknote className="mr-2 h-4 w-4" /> Pay with Cash
            </Button>
            <Button className="w-full" onClick={handleCardPayment}>
              <CreditCard className="mr-2 h-4 w-4" /> Pay with Card
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardSidebar>
  )
}
