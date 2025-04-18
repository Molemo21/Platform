"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { isLoggedIn, getUserType } from "@/utils/auth-helpers"
import { ArrowRight, Briefcase, Calendar, CheckCircle, Clock, DollarSign, Star, Users, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function ContractorLandingPage() {
  const router = useRouter()
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"client" | "contractor">("contractor")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const loggedIn = isLoggedIn()
    const type = getUserType()

    setUserLoggedIn(loggedIn)
    setUserType(type)

    // Redirect to login if not logged in as contractor
    if (!loggedIn || type !== "contractor") {
      router.push("/login")
    }
  }, [router])

  // Testimonial auto-flip timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped(true)
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setIsFlipped(false)
      }, 400)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const testimonials = [
    {
      quote: "ProLiink Connect has transformed my business. I get consistent jobs and the platform is so easy to use.",
      name: "Thabo",
      location: "Electrician, Johannesburg",
      avatar: "/placeholder.svg?height=50&width=50",
      initials: "TM",
    },
    {
      quote: "Since joining ProLiink, my client base has grown by 40%. The payment system is reliable and fast.",
      name: "Nomfundo",
      location: "Hairdresser, Cape Town",
      avatar: "/placeholder.svg?height=50&width=50",
      initials: "NM",
    },
    {
      quote: "I love how I can manage my schedule and choose which jobs to accept. It gives me flexibility.",
      name: "Sipho",
      location: "Plumber, Durban",
      avatar: "/placeholder.svg?height=50&width=50",
      initials: "SK",
    },
  ]

  const handlePrevTestimonial = () => {
    setIsFlipped(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
      setIsFlipped(false)
    }, 400)
  }

  const handleNextTestimonial = () => {
    setIsFlipped(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      setIsFlipped(false)
    }, 400)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx global>{`
        /* Testimonial card flip animation */
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
      `}</style>

      <Navbar isLoggedIn={userLoggedIn} userType={userType} />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 bg-gradient-to-br from-primary to-secondary overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-8"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
              >
                Welcome to Your Contractor Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto max-w-[700px] text-lg md:text-xl"
              >
                Manage your services, connect with clients, and grow your business with ProLiink Connect
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Link
                  href="/dashboard/contractor"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      className: "bg-white text-primary hover:bg-white/90"
                    })
                  )}
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/dashboard/contractor/profile"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: "outline",
                      className: "border-white text-white hover:bg-white/10"
                    })
                  )}
                >
                  View Profile
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: "Active Jobs", value: "3", icon: Briefcase },
                { label: "Completed Jobs", value: "78", icon: CheckCircle },
                { label: "Earnings", value: "R45,600", icon: DollarSign },
                { label: "Rating", value: "4.8", icon: Star },
              ].map((stat, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-none shadow-md">
                  <CardHeader className="pb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-3xl font-bold">{stat.value}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Quick Actions</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  title: "View Job Requests",
                  description: "Check new job requests from clients and respond to them",
                  icon: Calendar,
                  link: "/dashboard/contractor",
                  color: "bg-blue-50 dark:bg-blue-900/20",
                  iconColor: "text-blue-500",
                },
                {
                  title: "Update Availability",
                  description: "Set your working hours and days to receive relevant job requests",
                  icon: Clock,
                  link: "/dashboard/contractor/profile?tab=availability",
                  color: "bg-green-50 dark:bg-green-900/20",
                  iconColor: "text-green-500",
                },
                {
                  title: "View Client Messages",
                  description: "Check and respond to messages from your clients",
                  icon: Users,
                  link: "/dashboard/contractor/messages",
                  color: "bg-purple-50 dark:bg-purple-900/20",
                  iconColor: "text-purple-500",
                },
              ].map((action, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link href={action.link}>
                    <Card
                      className={`h-full cursor-pointer transition-all duration-200 hover:shadow-md ${action.color}`}
                    >
                      <CardHeader>
                        <action.icon className={`h-8 w-8 ${action.iconColor}`} />
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="mb-2">{action.title}</CardTitle>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{action.description}</p>
                        <div className="flex items-center text-primary">
                          <span className="mr-2">Go to {action.title.split(" ").pop()}</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                Success Stories
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Hear from other contractors who have grown their business with ProLiink Connect
              </p>
            </motion.div>

            <div className="flex flex-col items-center justify-center">
              <div className="testimonial-card">
                <div className={`testimonial-card-inner ${isFlipped ? "flipped" : ""}`}>
                  <div className="testimonial-card-front bg-white dark:bg-gray-800 text-center">
                    <Quote className="w-10 h-10 text-primary/30 dark:text-primary/20 mb-4" />
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
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {testimonials[currentTestimonial].name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonials[currentTestimonial].location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-card-back bg-white dark:bg-gray-800 text-center">
                    <Quote className="w-10 h-10 text-primary/30 dark:text-primary/20 mb-4" />
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
                        <p className="font-semibold text-gray-900 dark:text-white">
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
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </Button>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full ${
                        index === currentTestimonial ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      onClick={() => {
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
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Tips for Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Complete Your Profile",
                  description:
                    "Contractors with complete profiles including photos and certifications get 3x more jobs.",
                },
                {
                  title: "Respond Quickly",
                  description:
                    "Aim to respond to job requests within 1 hour to increase your chances of getting hired.",
                },
                {
                  title: "Set Competitive Rates",
                  description:
                    "Research market rates for your services and set competitive prices to attract more clients.",
                },
                {
                  title: "Ask for Reviews",
                  description:
                    "After completing a job, politely ask clients to leave a review to build your reputation.",
                },
              ].map((tip, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-none shadow-md">
                  <CardHeader>
                    <CardTitle>{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 ProLiink Connect. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
