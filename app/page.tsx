"use client"

import Link from "next/link"
import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  UserCheck,
  Wrench,
  Zap,
  Scissors,
  PaintbrushIcon as PaintBrush,
  SpadeIcon as Spa,
  Leaf,
  MessageCircle,
  ArrowUp,
  Shield,
  Clock,
  CheckCircle,
  FileText,
  ChevronDown,
  Search,
  Star,
  DollarSign,
  LockIcon,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowRight,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { HeroSlideshow } from "@/components/hero-slideshow"
import { Navbar } from "@/components/navbar"
import { SearchAutocomplete } from "@/components/search-autocomplete"
import { isLoggedIn, getUserType } from "@/utils/auth-helpers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// First, let's add the necessary imports for the new sections
import { BookOpen, ArrowLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// Define ProLiink brand colors
const proliinkColors = {
  proGray: "#4A4A4A", // Gray color for "Pro"
  linkBlue: "#00A3E0", // Blue color for "i" in "Liink"
}

// Add this style to hide scrollbars for the services slider and implement the slide-over effect
const customStyles = `
:root {
  --pro-gray: ${proliinkColors.proGray};
  --link-blue: ${proliinkColors.linkBlue};
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hero-section {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.cover-section {
  height: 100vh;
  position: relative;
  width: 100%;
  z-index: 2;
  margin-top: 100vh;
  overflow: hidden;
}

.cover-section-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/contractors-meeting.png');
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease-out;
  will-change: transform;
}

.cover-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.content-sections {
  position: relative;
  z-index: 2;
  background-color: white;
}

.dark .content-sections {
  background-color: #111827;
}

.glass-menu {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-menu-nav {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.glass-menu-nav:hover {
  transform: scale(1.1);
}

.service-card {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
}

.service-card-content {
  position: relative;
  z-index: 2;
  padding: 1.5rem;
  color: white;
}

/* Testimonial card styles */
.testimonial-card {
  perspective: 1000px;
  height: 300px;
  width: 100%;
  max-width: 600px;
}

.testimonial-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.testimonial-card-inner.flipped {
  transform: rotateY(180deg);
}

.testimonial-card-front,
.testimonial-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.testimonial-card-back {
  transform: rotateY(180deg);
}

// Add this to the customStyles string constant for the partners section
.partners-container {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.partners-track {
  display: flex;
  animation: scroll 30s linear infinite;
  width: max-content;
}

.partners-track:hover {
  animation-play-state: paused;
}

.partner-logo {
  flex-shrink: 0;
  height: 80px;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.partner-logo:hover {
  filter: grayscale(0%);
  opacity: 1;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 2));
  }
}

.blog-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* ProLiink brand color classes */
.bg-pro-gray {
  background-color: var(--pro-gray);
}

.bg-link-blue {
  background-color: var(--link-blue);
}

.text-pro-gray {
  color: var(--pro-gray);
}

.text-link-blue {
  color: var(--link-blue);
}

.border-pro-gray {
  border-color: var(--pro-gray);
}

.border-link-blue {
  border-color: var(--link-blue);
}

.from-pro-gray {
  --tw-gradient-from: var(--pro-gray);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(74, 74, 74, 0));
}

.from-link-blue {
  --tw-gradient-from: var(--link-blue);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 163, 224, 0));
}

.to-pro-gray {
  --tw-gradient-to: var(--pro-gray);
}

.to-link-blue {
  --tw-gradient-to: var(--link-blue);
}
`

const services = [
  {
    name: "Plumber",
    icon: Wrench,
    description: "Expert solutions for leak repairs, pipe installations, and clogged drains.",
    slug: "plumber",
    minPrice: 600,
    cta: "Book a Plumber",
    bgColor: "from-blue-900 to-blue-700",
    bgImage: "/images/plumber-real.webp",
  },
  {
    name: "Electrician",
    icon: Zap,
    description: "Professional wiring, lighting installation, and appliance repairs.",
    slug: "electrician",
    minPrice: 600,
    cta: "Find an Electrician",
    bgColor: "from-yellow-600 to-amber-500",
    bgImage: "/images/electrician.jpg",
  },
  {
    name: "Gardener",
    icon: Leaf,
    description: "Lawn mowing, tree trimming, and landscaping for your outdoor space.",
    slug: "gardener",
    minPrice: 600,
    cta: "Hire a Gardener",
    bgColor: "from-green-800 to-green-600",
    bgImage: "/images/gardener.webp",
  },
  {
    name: "Hairdresser",
    icon: Scissors,
    description: "Professional hair cutting, styling, and coloring services.",
    slug: "hairdresser",
    minPrice: 50,
    cta: "Book a Hairdresser",
    bgColor: "from-purple-800 to-purple-600",
    bgImage: "/images/hairdresser.webp",
  },
  {
    name: "Painter",
    icon: PaintBrush,
    description: "Expert interior and exterior painting services for homes and businesses.",
    slug: "painter",
    minPrice: 600,
    cta: "Hire a Painter",
    bgColor: "from-red-800 to-red-600",
    bgImage: "/images/painter.jpg",
  },
  {
    name: "Spa Treatments",
    icon: Spa,
    description: "Relaxing and rejuvenating spa services including massages and facials.",
    slug: "spa-treatment",
    minPrice: 600,
    cta: "Book a Spa Treatment",
    bgColor: "from-teal-800 to-teal-600",
    bgImage: "/images/spa-treatment.jpg",
  },
]

const testimonials = [
  {
    quote:
      "ProLiink Connect made finding a reliable plumber so easy! The service was fast and the quality was excellent.",
    name: "Nomfundo",
    location: "Cape Town",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "NM",
  },
  {
    quote:
      "I've used many service platforms before, but ProLiink Connect is by far the most reliable and user-friendly.",
    name: "Thabo",
    location: "Johannesburg",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "TM",
  },
  {
    quote: "As a busy professional, I appreciate how quick and easy it is to book services through ProLiink Connect.",
    name: "Lerato",
    location: "Durban",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "LN",
  },
  {
    quote: "The contractors on ProLiink Connect are professional and skilled. I'm always satisfied with the service.",
    name: "Sipho",
    location: "Pretoria",
    avatar: "/placeholder.svg?height=50&width=50",
    initials: "SK",
  },
]

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

export default function LandingPage() {
  const router = useRouter()
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([{ role: "bot", content: "Hello! How can I assist you today?" }])
  const [userInput, setUserInput] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"client" | "contractor">("client")
  const servicesSliderRef = useRef<HTMLDivElement>(null)
  const coverBgRef = useRef<HTMLDivElement>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [manualFlip, setManualFlip] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  })

  // Check if user is logged in
  useEffect(() => {
    // This is a simple simulation - in a real app, you'd check auth state
    setUserLoggedIn(isLoggedIn())
    setUserType(getUserType())
  }, [])

  // Testimonial auto-flip timer - only if not manually flipped
  useEffect(() => {
    if (!manualFlip) {
      const timer = setInterval(() => {
        setIsFlipped(true)
        setTimeout(() => {
          setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
          setIsFlipped(false)
        }, 400)
      }, 6000)

      return () => clearInterval(timer)
    }
  }, [manualFlip])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
    console.log(values)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrollY(scrollPosition)

      // Apply zoom effect to cover image
      if (coverBgRef.current) {
        const scale = 1 + (scrollPosition - window.innerHeight) * 0.0003
        if (scale > 1 && scale < 1.3) {
          coverBgRef.current.style.transform = `scale(${scale})`
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userInput.trim()) {
      setChatMessages([...chatMessages, { role: "user", content: userInput }])
      // Here you would typically call an API to get the bot's response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "Thank you for your message. A customer service representative will get back to you shortly.",
          },
        ])
      }, 1000)
      setUserInput("")
    }
  }

  const handleSearch = (query: string) => {
    router.push(`/dashboard/client?search=${encodeURIComponent(query)}`)
  }

  const scrollServicesLeft = () => {
    if (servicesSliderRef.current) {
      servicesSliderRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollServicesRight = () => {
    if (servicesSliderRef.current) {
      servicesSliderRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handlePrevTestimonial = () => {
    setManualFlip(true)
    setIsFlipped(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
      setIsFlipped(false)
    }, 400)
  }

  const handleNextTestimonial = () => {
    setManualFlip(true)
    setIsFlipped(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      setIsFlipped(false)
    }, 400)
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <style jsx global>
        {customStyles}
      </style>

      {/* Navigation Bar with conditional rendering based on login status */}
      <Navbar isLoggedIn={userLoggedIn} userType={userType} />

      <main className="flex-1 pt-16">
        {/* Hero Section - Fixed */}
        <section className="hero-section relative w-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <HeroSlideshow />
          </div>
          <div className="relative container px-4 md:px-6 z-10 h-full flex items-center">
            <div className="flex flex-col items-center space-y-4 text-center text-white w-full">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
              >
                Find Reliable Contractors Instantly – Fast, Safe & Verified!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto max-w-[700px] text-lg md:text-xl"
              >
                Connect with trusted plumbers, electricians, and other skilled contractors in your area. Hassle-free and
                transparent pricing!
              </motion.p>

              {/* Search bar - only shown for logged-in clients */}
              {userLoggedIn && userType === "client" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="w-full max-w-md mt-6"
                >
                  <SearchAutocomplete onSearch={handleSearch} />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Cover Section with the contractors meeting image - now with zoom effect */}
        <section className="cover-section">
          <div ref={coverBgRef} className="cover-section-bg"></div>
        </section>

        {/* Content Sections that will slide over the hero */}
        <div className="content-sections">
          {/* Services Section - Portrait cards with horizontal scrolling */}
          <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-pro-gray dark:text-white">
                Our Services
              </h2>

              <div className="relative">
                {/* Left Arrow */}
                <button
                  onClick={scrollServicesLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-lg backdrop-blur-sm"
                  aria-label="Previous service"
                >
                  <ChevronDown className="h-6 w-6 rotate-90 text-pro-gray dark:text-gray-200" />
                </button>

                {/* Services Slider - Made smaller */}
                <div
                  id="services-slider"
                  ref={servicesSliderRef}
                  className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 hide-scrollbar"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="min-w-[200px] md:min-w-[220px] h-[300px] snap-start flex-shrink-0 service-card"
                      style={{
                        backgroundImage: `url('${service.bgImage}')`,
                      }}
                    >
                      <div className="service-card-content flex flex-col h-full justify-between">
                        <div>
                          <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                          <p className="text-xs mb-4">{service.description}</p>
                        </div>
                        <Link
                          href={userLoggedIn ? `/dashboard/client?category=${service.slug}` : "/login"}
                          className={cn(
                            buttonVariants({
                              className: "bg-white text-pro-gray hover:bg-gray-100 w-full text-sm py-1"
                            })
                          )}
                        >
                          {service.cta}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={scrollServicesRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-lg backdrop-blur-sm"
                  aria-label="Next service"
                >
                  <ChevronDown className="h-6 w-6 -rotate-90 text-pro-gray dark:text-gray-200" />
                </button>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
            <div className="container px-4 md:px-6 mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pro-gray dark:text-white">
                  How It Works
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Find and hire skilled professionals in just a few simple steps
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Post Your Job",
                    icon: FileText,
                    description: "Describe your needs, set your budget, and choose when you need the service.",
                    color: "bg-gray-50 dark:bg-gray-900/20",
                    iconColor: "text-link-blue dark:text-link-blue",
                    borderColor: "border-gray-200 dark:border-gray-800",
                  },
                  {
                    title: "Get Matched",
                    icon: UserCheck,
                    description: "We'll connect you with verified professionals who match your requirements.",
                    color: "bg-gray-50 dark:bg-gray-900/20",
                    iconColor: "text-link-blue dark:text-link-blue",
                    borderColor: "border-gray-200 dark:border-gray-800",
                  },
                  {
                    title: "Compare Offers",
                    icon: Search,
                    description: "Review profiles, ratings, and quotes from interested service providers.",
                    color: "bg-gray-50 dark:bg-gray-900/20",
                    iconColor: "text-link-blue dark:text-link-blue",
                    borderColor: "border-gray-200 dark:border-gray-800",
                  },
                  {
                    title: "Hire & Rate",
                    icon: Star,
                    description: "Select your preferred professional, get the job done, and leave a review.",
                    color: "bg-gray-50 dark:bg-gray-900/20",
                    iconColor: "text-link-blue dark:text-link-blue",
                    borderColor: "border-gray-200 dark:border-gray-800",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    }}
                    className={`rounded-xl border ${step.borderColor} ${step.color} p-6 flex flex-col items-center text-center transition-all duration-200`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${step.iconColor} bg-white dark:bg-gray-800`}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-pro-gray text-white flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <h3 className="ml-2 text-xl font-bold text-pro-gray dark:text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="features"
            className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-pro-gray to-link-blue dark:from-gray-950 dark:to-link-blue"
          >
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-full h-full">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/5"
                    initial={{
                      x: Math.random() * 100 - 50 + "%",
                      y: Math.random() * 100 - 50 + "%",
                      scale: Math.random() * 0.5 + 0.5,
                      opacity: Math.random() * 0.3 + 0.1,
                    }}
                    animate={{
                      x: [null, Math.random() * 100 - 50 + "%"],
                      y: [null, Math.random() * 100 - 50 + "%"],
                    }}
                    transition={{
                      duration: Math.random() * 20 + 20,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                    style={{
                      width: Math.random() * 200 + 50,
                      height: Math.random() * 200 + 50,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="container px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Why Choose ProLiink Connect
                </h2>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                  We're revolutionizing how you connect with skilled professionals
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Verified Professionals",
                    description: "Every service provider is thoroughly vetted and verified for your peace of mind",
                    icon: Shield,
                    gradient: "from-link-blue to-cyan-400",
                  },
                  {
                    title: "Transparent Pricing",
                    description: "Clear, upfront pricing with no hidden fees or surprises",
                    icon: DollarSign,
                    gradient: "from-link-blue to-cyan-400",
                  },
                  {
                    title: "Fast Response Time",
                    description: "Get matched with available professionals within minutes, not days",
                    icon: Clock,
                    gradient: "from-link-blue to-cyan-400",
                  },
                  {
                    title: "Smart Matching",
                    description: "Our algorithm finds the perfect professional for your specific needs",
                    icon: Zap,
                    gradient: "from-link-blue to-cyan-400",
                  },
                  {
                    title: "Secure Payments",
                    description: "Your transactions are protected with bank-level security",
                    icon: LockIcon,
                    gradient: "from-link-blue to-cyan-400",
                  },
                  {
                    title: "Quality Guaranteed",
                    description: "Satisfaction guaranteed or we'll make it right",
                    icon: CheckCircle,
                    gradient: "from-link-blue to-cyan-400",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                      rotateX: "5deg",
                      rotateY: "5deg",
                    }}
                    className="rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 p-6 flex flex-col transition-all duration-300 transform perspective-1000"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section with 3D Flip Card */}
          <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
                <motion.div
                  className="md:w-1/2"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pro-gray dark:text-white mb-6">
                    About ProLiink Connect
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <p>
                      ProLiink Connect is a revolutionary platform that bridges the gap between skilled professionals
                      and clients in need of their services. Our mission is to simplify the process of finding and
                      hiring reliable contractors, ensuring a seamless experience for both service providers and
                      customers.
                    </p>
                    <p>
                      Founded in 2024, we've quickly grown to become a trusted name in the industry, connecting
                      thousands of professionals with clients across the country. Our commitment to quality,
                      transparency, and customer satisfaction sets us apart in the world of service marketplaces.
                    </p>
                    <Button className="mt-6 bg-link-blue hover:bg-link-blue/90 text-white">Learn More</Button>
                  </div>
                </motion.div>

                <motion.div
                  className="md:w-1/2"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-pro-gray to-link-blue rounded-2xl opacity-30 blur-xl"></div>
                    <img
                      src="/images/contractors-meeting.png"
                      alt="ProLiink Connect Team"
                      className="relative rounded-2xl w-full h-auto object-cover shadow-xl"
                      style={{ maxHeight: "500px" }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Testimonials Section with 3D Flip Card */}
          <section
            id="testimonials"
            className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800"
          >
            <div className="container px-4 md:px-6 mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pro-gray dark:text-white">
                  What Our Clients Say
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Hear from people who have found the perfect service provider through ProLiink Connect
                </p>
              </motion.div>

              <div className="flex flex-col items-center justify-center">
                <div className="testimonial-card">
                  <div className={`testimonial-card-inner ${isFlipped ? "flipped" : ""}`}>
                    <div className="testimonial-card-front bg-white dark:bg-gray-800 text-center">
                      <Quote className="w-10 h-10 text-link-blue/30 dark:text-link-blue/20 mb-4" />
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                        {testimonials[currentTestimonial].quote}
                      </p>
                      <div className="flex items-center justify-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage
                            src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                            alt={testimonials[currentTestimonial].name}
                          />
                          <AvatarFallback>{testimonials[currentTestimonial].initials}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="font-semibold text-pro-gray dark:text-white">
                            {testimonials[currentTestimonial].name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonials[currentTestimonial].location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="testimonial-card-back bg-white dark:bg-gray-800 text-center">
                      <Quote className="w-10 h-10 text-link-blue/30 dark:text-link-blue/20 mb-4" />
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                        {testimonials[(currentTestimonial + 1) % testimonials.length].quote}
                      </p>
                      <div className="flex items-center justify-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage
                            src={
                              testimonials[(currentTestimonial + 1) % testimonials.length].avatar || "/placeholder.svg"
                            }
                            alt={testimonials[(currentTestimonial + 1) % testimonials.length].name}
                          />
                          <AvatarFallback>
                            {testimonials[(currentTestimonial + 1) % testimonials.length].initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="font-semibold text-pro-gray dark:text-white">
                            {testimonials[(currentTestimonial + 1) % testimonials.length].name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonials[(currentTestimonial + 1) % testimonials.length].location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-8 space-x-4">
                  <Button variant="outline" size="icon" className="rounded-full" onClick={handlePrevTestimonial}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${
                          index === currentTestimonial ? "bg-link-blue" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                        onClick={() => {
                          setManualFlip(true)
                          setIsFlipped(true)
                          setTimeout(() => {
                            setCurrentTestimonial(index)
                            setIsFlipped(false)
                          }, 400)
                        }}
                      />
                    ))}
                  </div>
                  <Button variant="outline" size="icon" className="rounded-full" onClick={handleNextTestimonial}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section
            id="mobile-app"
            className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-pro-gray to-link-blue dark:from-gray-800 dark:to-gray-900"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                    Mobile App Coming Soon
                  </h2>
                  <p className="text-xl text-white mb-6">
                    Get ready for an even more convenient way to find and book contractors. Our mobile app is currently
                    in development and will be launching soon!
                  </p>
                  <div className="flex flex-col space-y-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-white">
                      <h3 className="font-semibold mb-2">Features to Look Forward to:</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Real-time booking and tracking</li>
                        <li>Instant messaging with contractors</li>
                        <li>Service history and reviews</li>
                        <li>Push notifications for updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-xl"></div>
                    <img
                      src="/images/proliink-app-mockup.png"
                      alt="ProLiink Connect Mobile App Preview"
                      className="relative w-auto h-auto max-h-[600px] rounded-3xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="waitlist"
            className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-pro-gray to-link-blue dark:from-gray-900 dark:to-gray-800"
          >
            <div className="container px-4 md:px-6">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                  Join Our Waitlist
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Be the first to know when we launch and get exclusive early access to our platform.
                </p>
                <Card className="bg-white/10 backdrop-blur-lg text-white">
                  <CardContent className="pt-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your name" {...field} className="bg-white/10" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your email" {...field} className="bg-white/10" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full bg-white text-pro-gray hover:bg-white/90">
                          Join Waitlist
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          {/* Blog Section */}
          <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pro-gray dark:text-white">
                  Latest from Our Blog
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Stay updated with the latest trends, tips, and insights from the service industry
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "10 Tips for Finding the Right Contractor",
                    excerpt: "Learn how to vet and choose the perfect professional for your next home project.",
                    image: "/placeholder.svg?height=200&width=400",
                    date: "June 15, 2024",
                    category: "Guides",
                    readTime: "5 min read",
                  },
                  {
                    title: "How to Prepare Your Home for a Service Visit",
                    excerpt: "Simple steps to ensure your service appointment goes smoothly and efficiently.",
                    image: "/placeholder.svg?height=200&width=400",
                    date: "June 10, 2024",
                    category: "Tips",
                    readTime: "4 min read",
                  },
                  {
                    title: "The Future of Home Services in South Africa",
                    excerpt: "Exploring emerging trends and technologies shaping the service industry.",
                    image: "/placeholder.svg?height=200&width=400",
                    date: "June 5, 2024",
                    category: "Industry News",
                    readTime: "7 min read",
                  },
                ].map((blog, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="blog-card rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-link-blue text-white text-xs font-semibold px-2 py-1 rounded">
                        {blog.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>{blog.date}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-pro-gray dark:text-white">{blog.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.excerpt}</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-semibold text-link-blue dark:text-link-blue flex items-center"
                      >
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button variant="outline" className="gap-2 border-link-blue text-link-blue hover:bg-link-blue/10">
                  <BookOpen className="h-4 w-4" />
                  View All Articles
                </Button>
              </div>
            </div>
          </section>

          {/* Partners Section */}
          <section id="partners" className="w-full py-12 md:py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-pro-gray dark:text-white">
                  Our Trusted Partners
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Proudly supported by industry leaders who share our vision
                </p>
              </div>

              <div className="partners-container">
                <div className="partners-track">
                  {[...Array(2)].map((_, trackIndex) => (
                    <div key={trackIndex} className="flex items-center">
                      {[
                        {
                          name: "Deviare",
                          logo: "/images/partners/deviare.png",
                          width: 180,
                        },
                        {
                          name: "Liquid Intelligent Technologies",
                          logo: "/images/partners/liquid_intelligent_technologies_logo.jpg",
                          width: 220,
                        },
                        {
                          name: "King Sabata Dalindyebo TVET College",
                          logo: "/images/partners/king_sabata_dalindyebo_tvet_college.jpg",
                          width: 200,
                        },
                        {
                          name: "King Sabata Dalindyebo Municipality",
                          logo: "/images/partners/king_sabata_dalindyebo_municipality.png",
                          width: 180,
                        },
                      ].map((partner, index) => (
                        <div key={`${trackIndex}-${index}`} className="flex items-center justify-center mx-8">
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={`${partner.name} logo`}
                            className="partner-logo"
                            style={{ width: partner.width + "px", height: "auto", objectFit: "contain" }}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 text-center">
                <Button variant="outline" className="gap-2 border-link-blue text-link-blue hover:bg-link-blue/10">
                  <ArrowLeftRight className="h-4 w-4" />
                  Become a Partner
                </Button>
              </div>
            </div>
          </section>

          <section
            id="contact"
            className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-pro-gray to-link-blue dark:from-gray-900 dark:to-gray-800 text-white"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Contact Us
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-center mb-8">
                  Have questions or need assistance? Our team is here to help. Reach out to us using the information
                  below.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p>support@proliinkconnect.com</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Phone</h3>
                    <p>+27 78 128 3697</p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Button
                    className="bg-white text-pro-gray hover:bg-blue-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    onClick={() => router.push("/contact")}
                  >
                    Send Us a Message
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* "Ready to Get Started" section - only shown for non-logged-in users */}
          {!userLoggedIn && (
            <motion.section
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={fadeIn}
              className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-pro-gray to-link-blue dark:from-gray-800 dark:to-gray-900"
            >
              <div className="container px-4 md:px-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">
                    Ready to Get Started?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-lg md:text-xl mb-8 text-white">
                    Find the perfect contractor for your project or join our network of skilled professionals.
                  </p>
                  <div className="space-x-4">
                    <Button
                      className="bg-white text-pro-gray hover:bg-blue-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      asChild
                    >
                      <Link href="/login">Find a Contractor</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-pro-gray dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                      asChild
                    >
                      <Link href="/contractors">Join as a Contractor</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </div>
        <motion.button
          className="fixed bottom-4 right-4 bg-link-blue text-white p-2 rounded-full shadow-lg z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY > 100 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 ProLiink Connect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400">
                Terms of Service
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Terms of Service</DialogTitle>
              </DialogHeader>
              <div className="prose prose-sm max-w-none dark:prose-invert">{/* Terms of Service content */}</div>
            </DialogContent>
          </Dialog>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
      {/* Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          className="rounded-full w-12 h-12 bg-link-blue text-white hover:bg-link-blue/90 dark:bg-white dark:text-link-blue dark:hover:bg-gray-200"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <MessageCircle />
        </Button>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Chat with us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`rounded-lg p-2 ${message.role === "user" ? "bg-link-blue text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-white"}`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleChatSubmit} className="mt-4">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Type your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="dark:bg-gray-700 dark:text-white"
                      />
                      <Button type="submit" className="bg-link-blue hover:bg-link-blue/90 text-white">
                        Send
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
