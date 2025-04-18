"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Header from "../components/Header"
import Footer from "../components/Footer"
import HeroSlideshow from "../components/HeroSlideshow"
import Chatbot from "../components/Chatbot"
import { useForm } from "react-hook-form"

const services = [
  {
    name: "Plumber",
    icon: "fa-wrench",
    description:
      "Expert solutions for leak repairs, pipe installations, clogged drains, and general maintenance to keep your water systems running smoothly.",
    slug: "plumber",
    minPrice: 600,
  },
  {
    name: "Electrician",
    icon: "fa-bolt",
    description:
      "Professional wiring, lighting installation, appliance repairs, and fault detection for homes and businesses.",
    slug: "electrician",
    minPrice: 600,
  },
  {
    name: "Gardener",
    icon: "fa-leaf",
    description: "Lawn mowing, tree trimming, landscaping, and plant care to keep your outdoor space looking its best.",
    slug: "gardener",
    minPrice: 600,
  },
  {
    name: "Hairdresser",
    icon: "fa-cut",
    description:
      "Professional hair cutting, styling, coloring, and treatment services for all hair types and preferences.",
    slug: "hairdresser",
    minPrice: 50,
  },
  {
    name: "Painter",
    icon: "fa-paint-brush",
    description:
      "Expert interior and exterior painting services for homes and businesses, including color consultation and surface preparation.",
    slug: "painter",
    minPrice: 600,
  },
  {
    name: "Spa Treatments",
    icon: "fa-spa",
    description:
      "Relaxing and rejuvenating spa services including massages, facials, body treatments, and aromatherapy.",
    slug: "spa-treatment",
    minPrice: 600,
  },
]

const features = [
  {
    title: "Verified Professionals",
    description: "All service providers are thoroughly vetted and verified for your peace of mind",
    icon: "fa-shield-alt",
  },
  {
    title: "Instant Booking",
    description: "Book services instantly with our easy-to-use platform",
    icon: "fa-clock",
  },
  {
    title: "Quality Guaranteed",
    description: "We ensure high-quality service delivery with our satisfaction guarantee",
    icon: "fa-check-circle",
  },
  {
    title: "Growing Community",
    description: "Join our growing community of satisfied clients and trusted professionals",
    icon: "fa-users",
  },
]

function LandingPage({ isDarkMode, toggleDarkMode }) {
  const router = useRouter()
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [scrollY, setScrollY] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const onSubmit = (data) => {
    console.log(data)
    // Handle form submission
    alert("Thank you for joining our waitlist!")
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <HeroSlideshow />
          <div className="relative container px-4 md:px-6 z-10">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex w-full max-w-sm items-center space-x-2 mb-4"
              >
                <input
                  type="text"
                  placeholder="Search for a service..."
                  className="w-full px-3 py-2 bg-white text-primary dark:bg-gray-700 dark:text-white rounded-l-md"
                />
                <button
                  onClick={() => router.push("/login")}
                  className="bg-secondary text-white hover:bg-primary dark:bg-white dark:text-primary dark:hover:bg-gray-200 px-4 py-2 rounded-r-md"
                >
                  Search
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <motion.section
          id="services"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-secondary to-primary dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-white">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/services/${service.slug}`} className="block">
                    <div className="bg-white bg-opacity-10 text-white hover:bg-opacity-20 transition-all duration-300 dark:bg-gray-800 dark:text-gray-200 overflow-hidden cursor-pointer rounded-lg p-6 h-full">
                      <div className="flex items-center gap-2 text-xl font-bold mb-4">
                        <i className={`fas ${service.icon}`}></i>
                        {service.name}
                      </div>
                      <p className="mb-4">{service.description}</p>
                      <p className="font-semibold">Starting from R{service.minPrice}</p>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          id="how-it-works"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary to-secondary dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logogg.jpg-BsfsbZOnBdeHRh2oNwvVCfhC0MiZIE.jpeg')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="container px-4 md:px-6 relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-white">
              How ProLiink Connect Works
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Choose a Service",
                  icon: "fa-search",
                  description: "Browse through our categories or use the search function to find the service you need.",
                },
                {
                  title: "Provide Details",
                  icon: "fa-file-alt",
                  description: "Describe your job, set your budget, and choose a date and time that works for you.",
                },
                {
                  title: "Get Matched",
                  icon: "fa-user-check",
                  description: "We'll match you with available, qualified contractors in your area.",
                },
                {
                  title: "Confirm and Book",
                  icon: "fa-calendar",
                  description:
                    "Review the details, confirm your booking, and wait for your service provider to arrive.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="bg-white bg-opacity-10 text-white dark:bg-gray-800 dark:text-gray-200 backdrop-blur-lg rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <i className={`fas ${step.icon} text-2xl text-primary dark:text-white`}></i>
                      <p>{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-secondary to-primary dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-white">
              Why Choose ProLiink Connect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white bg-opacity-10 text-white hover:bg-opacity-20 transition-all duration-300 dark:bg-gray-800 dark:text-gray-200 rounded-lg p-6 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <i className={`fas ${feature.icon} text-xl`}></i>
                      <h3 className="text-lg font-bold">{feature.title}</h3>
                    </div>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary to-secondary dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
        >
          <div className="container px-4 md:px-6 relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-white">
              About ProLiink Connect
            </h2>
            <div
              className="max-w-3xl mx-auto text-center transition-all duration-1000 ease-in-out transform translate-x-0 opacity-100"
              id="about-text"
            >
              <p className="text-lg mb-6 text-white">
                ProLiink Connect is a revolutionary platform that bridges the gap between skilled professionals and
                clients in need of their services. Our mission is to simplify the process of finding and hiring reliable
                contractors, ensuring a seamless experience for both service providers and customers.
              </p>
              <p className="text-lg mb-6 text-white">
                Founded in 2024, we've quickly grown to become a trusted name in the industry, connecting thousands of
                professionals with clients across the country. Our commitment to quality, transparency, and customer
                satisfaction sets us apart in the world of service marketplaces.
              </p>
              <p className="text-lg text-white">
                At ProLiink Connect, we believe in empowering both our contractors and clients. We provide a platform
                where skilled professionals can showcase their expertise and grow their businesses, while clients can
                easily find vetted, reliable services for all their needs.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section
          id="mobile-app"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-secondary to-primary dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                  Mobile App Coming Soon
                </h2>
                <p className="text-xl text-white mb-6">
                  Get ready for an even more convenient way to find and book contractors. Our mobile app is currently in
                  development and will be launching soon!
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
              <div className="md:w-1/2">
                <img
                  src="https://placehold.co/400x600"
                  alt="ProLiink Connect Mobile App Preview"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg opacity-50"
                />
                <div className="text-center mt-4">
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm backdrop-blur-lg">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section
          id="waitlist"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary to-secondary dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                Join Our Waitlist
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Be the first to know when we launch and get exclusive early access to our platform.
              </p>
              <div className="bg-white/10 backdrop-blur-lg text-white rounded-lg p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label htmlFor="name" className="block">
                      Name
                    </label>
                    <input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 bg-white/10 rounded-md"
                    />
                    {errors.name && <p className="text-red-300 text-sm">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2 text-left">
                    <label htmlFor="email" className="block">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 bg-white/10 rounded-md"
                    />
                    {errors.email && <p className="text-red-300 text-sm">{errors.email.message}</p>}
                  </div>
                  <button type="submit" className="w-full bg-white text-primary hover:bg-white/90 py-2 rounded-md">
                    Join Waitlist
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary to-secondary dark:from-gray-900 dark:to-gray-800 text-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Contact Us</h2>
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
                <Link
                  href="/contact"
                  className="bg-white text-primary hover:bg-blue-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 px-4 py-2 rounded-md inline-block"
                >
                  Send Us a Message
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-secondary to-primary dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl mb-8 text-white">
              Find the perfect contractor for your project or join our network of skilled professionals.
            </p>
            <div className="space-x-4">
              <Link
                href="/login"
                className="bg-white text-primary hover:bg-blue-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 px-4 py-2 rounded-md inline-block"
              >
                Find a Contractor
              </Link>
              <Link
                href="/register/contractor"
                className="border border-white text-white hover:bg-white hover:text-primary dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white px-4 py-2 rounded-md inline-block"
              >
                Join as a Contractor
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Scroll to top button */}
        <motion.button
          className="fixed bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg z-40"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY > 100 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <i className="fas fa-arrow-up"></i>
        </motion.button>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}

export default LandingPage
