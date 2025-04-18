"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Star,
  Users,
  Briefcase,
  Award,
  Shield,
  Clock,
  Wrench,
  Zap,
  Scissors,
  Leaf,
  SpadeIcon as Spa,
  PaintbrushIcon as PaintBrush,
  ChevronDown,
} from "lucide-react"
import { motion } from "framer-motion"
import { useRef } from "react"
import { ProLiinkLogo } from "@/components/proliink-logo"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function ContractorsPage() {
  const servicesSliderRef = useRef<HTMLDivElement>(null)

  // Animation variants for staggered animations
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

  const services = [
    {
      name: "Plumber",
      icon: Wrench,
      description: "Expert solutions for leak repairs, pipe installations, and clogged drains.",
      slug: "plumber",
      minPrice: 600,
      cta: "Join as a Plumber",
      bgColor: "from-blue-900 to-blue-700",
      bgImage: "/images/plumber-real.webp",
    },
    {
      name: "Electrician",
      icon: Zap,
      description: "Professional wiring, lighting installation, and appliance repairs.",
      slug: "electrician",
      minPrice: 600,
      cta: "Join as an Electrician",
      bgColor: "from-yellow-600 to-amber-500",
      bgImage: "/images/electrician.jpg",
    },
    {
      name: "Gardener",
      icon: Leaf,
      description: "Lawn mowing, tree trimming, and landscaping for outdoor spaces.",
      slug: "gardener",
      minPrice: 600,
      cta: "Join as a Gardener",
      bgColor: "from-green-800 to-green-600",
      bgImage: "/images/gardener.webp",
    },
    {
      name: "Hairdresser",
      icon: Scissors,
      description: "Professional hair cutting, styling, and coloring services.",
      slug: "hairdresser",
      minPrice: 50,
      cta: "Join as a Hairdresser",
      bgColor: "from-purple-800 to-purple-600",
      bgImage: "/images/hairdresser.webp",
    },
    {
      name: "Painter",
      icon: PaintBrush,
      description: "Expert interior and exterior painting services for homes and businesses.",
      slug: "painter",
      minPrice: 600,
      cta: "Join as a Painter",
      bgColor: "from-red-800 to-red-600",
      bgImage: "/images/painter.jpg",
    },
    {
      name: "Spa Specialist",
      icon: Spa,
      description: "Relaxing and rejuvenating spa services including massages and facials.",
      slug: "spa-treatment",
      minPrice: 600,
      cta: "Join as a Spa Specialist",
      bgColor: "from-teal-800 to-teal-600",
      bgImage: "/images/spa-treatment.jpg",
    },
  ]

  const scrollServicesLeft = () => {
    if (servicesSliderRef.current) {
      servicesSliderRef.current.scrollBy({ left: -350, behavior: "smooth" })
    }
  }

  const scrollServicesRight = () => {
    if (servicesSliderRef.current) {
      servicesSliderRef.current.scrollBy({ left: 350, behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/contractors-meeting.png')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative container px-4 md:px-6 z-10">
          <div className="flex flex-col items-center space-y-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <ProLiinkLogo className="h-16 w-auto text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
            >
              Grow Your Business with ProLiink Connect
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-[700px] text-lg md:text-xl"
            >
              Join our network of skilled professionals and connect with clients looking for your services.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Link
                href="/register/contractor"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    className: "bg-primary hover:bg-primary/90 text-white"
                  })
                )}
              >
                Register as a Contractor
              </Link>
              <Link
                href="#services"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "outline",
                    className: "bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20"
                  })
                )}
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Copied from main landing page and adapted */}
      <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white">
            Join Our Service Categories
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            ProLiink Connect offers opportunities for professionals across various service categories. Choose your
            specialty and start growing your business today.
          </p>

          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollServicesLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-lg backdrop-blur-sm"
              aria-label="Previous service"
            >
              <ChevronDown className="h-6 w-6 rotate-90 text-gray-700 dark:text-gray-200" />
            </button>

            {/* Services Slider */}
            <div
              id="services-slider"
              ref={servicesSliderRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {services.map((service) => (
                <div
                  key={service.name}
                  className="min-w-[300px] md:min-w-[320px] h-[450px] snap-start flex-shrink-0 service-card"
                  style={{
                    backgroundImage: `url('${service.bgImage}')`,
                  }}
                >
                  <div className="service-card-content flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                      <p className="text-base mb-4">{service.description}</p>
                    </div>
                    <Link
                      href="/register/contractor"
                      className={cn(
                        buttonVariants({
                          className: "bg-white text-gray-900 hover:bg-gray-100 w-full"
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
              <ChevronDown className="h-6 w-6 -rotate-90 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section with Glass Effect and Animation */}
      <section
        id="benefits"
        className="py-12 md:py-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20 relative overflow-hidden"
      >
        {/* Glass background effect */}
        <div className="absolute inset-0 backdrop-blur-md bg-white/10"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/10"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white"
          >
            Why Join ProLiink Connect?
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Expand Your Client Base",
                description: "Connect with new clients in your area who are actively looking for your services.",
                icon: Users,
              },
              {
                title: "Flexible Schedule",
                description: "Choose when you work and which jobs you want to take on.",
                icon: Clock,
              },
              {
                title: "Increased Earnings",
                description: "Set your own rates and earn more with our low platform fees.",
                icon: Briefcase,
              },
              {
                title: "Build Your Reputation",
                description: "Collect reviews and ratings to showcase your quality work.",
                icon: Star,
              },
              {
                title: "Professional Profile",
                description: "Create a professional online presence to attract more clients.",
                icon: Award,
              },
              {
                title: "Secure Payments",
                description: "Get paid securely and on time through our platform.",
                icon: Shield,
              },
            ].map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white/10 backdrop-blur-sm text-white">
                  <CardHeader>
                    <benefit.icon className="h-8 w-8 text-blue-300 mb-2" />
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-200">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description: "Sign up and create your professional profile showcasing your skills and experience.",
              },
              {
                step: "2",
                title: "Receive Job Requests",
                description: "Get notified when clients in your area request your services.",
              },
              {
                step: "3",
                title: "Complete Jobs & Get Paid",
                description: "Provide excellent service, collect reviews, and receive secure payments.",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Contractor Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                profession: "Plumber",
                testimonial:
                  "Since joining ProLiink Connect, my business has grown by 40%. The platform makes it easy to find new clients and manage my schedule.",
                rating: 5,
              },
              {
                name: "Sarah Johnson",
                profession: "Electrician",
                testimonial:
                  "I love the flexibility ProLiink Connect offers. I can choose which jobs to take and when to work, allowing me to balance my work and family life.",
                rating: 5,
              },
              {
                name: "Michael Brown",
                profession: "Gardener",
                testimonial:
                  "The secure payment system gives me peace of mind, and the reviews from satisfied clients have helped me build a strong reputation in my area.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.profession}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">"{testimonial.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-primary text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl mb-8">
            Join our network of skilled professionals today and start connecting with clients in your area.
          </p>
          <Link
            href="/register/contractor"
            className={cn(
              buttonVariants({
                size: "lg",
                className: "bg-white text-primary hover:bg-gray-100"
              })
            )}
          >
            Register as a Contractor
          </Link>
        </div>
      </section>

      {/* Footer */}
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
