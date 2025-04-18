"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"

const categoryData = {
  plumber: {
    title: "Plumbing Services",
    description: "Professional plumbing solutions for your home and business",
    services: [
      {
        name: "Emergency Repairs",
        description: "24/7 emergency plumbing repairs for urgent issues",
        price: "From R600",
      },
      {
        name: "Installation Services",
        description: "Professional installation of fixtures and appliances",
        price: "From R800",
      },
      {
        name: "Maintenance",
        description: "Regular maintenance and inspections",
        price: "From R500",
      },
      {
        name: "Drain Cleaning",
        description: "Professional drain cleaning and unclogging services",
        price: "From R400",
      },
    ],
  },
  electrician: {
    title: "Electrical Services",
    description: "Expert electrical solutions for residential and commercial needs",
    services: [
      {
        name: "Electrical Repairs",
        description: "Fixing electrical issues and faulty wiring",
        price: "From R500",
      },
      {
        name: "Installation",
        description: "New electrical installations and upgrades",
        price: "From R800",
      },
      {
        name: "Safety Inspections",
        description: "Comprehensive electrical safety inspections",
        price: "From R600",
      },
      {
        name: "Emergency Services",
        description: "24/7 emergency electrical repairs",
        price: "From R700",
      },
    ],
  },
  gardener: {
    title: "Gardening Services",
    description: "Professional garden maintenance and landscaping services",
    services: [
      {
        name: "Lawn Maintenance",
        description: "Regular lawn mowing and maintenance",
        price: "From R300",
      },
      {
        name: "Landscaping",
        description: "Custom landscape design and implementation",
        price: "From R1000",
      },
      {
        name: "Tree Services",
        description: "Tree trimming, removal, and maintenance",
        price: "From R500",
      },
      {
        name: "Garden Design",
        description: "Professional garden design services",
        price: "From R800",
      },
    ],
  },
  hairdresser: {
    title: "Hair Styling Services",
    description: "Professional hair care and styling services",
    services: [
      {
        name: "Haircut & Styling",
        description: "Professional haircuts and styling",
        price: "From R200",
      },
      {
        name: "Color Services",
        description: "Hair coloring and highlights",
        price: "From R500",
      },
      {
        name: "Treatment",
        description: "Hair treatments and conditioning",
        price: "From R300",
      },
      {
        name: "Special Occasion",
        description: "Special occasion hair styling",
        price: "From R400",
      },
    ],
  },
  painter: {
    title: "Painting Services",
    description: "Professional painting services for interior and exterior",
    services: [
      {
        name: "Interior Painting",
        description: "Professional interior painting services",
        price: "From R1000",
      },
      {
        name: "Exterior Painting",
        description: "Expert exterior painting solutions",
        price: "From R2000",
      },
      {
        name: "Decorative Painting",
        description: "Custom decorative painting and finishes",
        price: "From R1500",
      },
      {
        name: "Commercial Painting",
        description: "Commercial painting services",
        price: "From R3000",
      },
    ],
  },
  "spa-treatment": {
    title: "Spa Treatment Services",
    description: "Luxurious spa treatments and wellness services",
    services: [
      {
        name: "Massage Therapy",
        description: "Various massage therapy treatments",
        price: "From R400",
      },
      {
        name: "Facial Treatments",
        description: "Professional facial treatments",
        price: "From R300",
      },
      {
        name: "Body Treatments",
        description: "Rejuvenating body treatments",
        price: "From R500",
      },
      {
        name: "Wellness Packages",
        description: "Comprehensive wellness packages",
        price: "From R800",
      },
    ],
  },
}

function ServiceCategoryPage({ isDarkMode, toggleDarkMode }) {
  const params = useParams()
  const category = params.category
  const categoryInfo = categoryData[category]

  if (!categoryInfo) {
    return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category not found</h1>
            <Link href="/services" className="text-primary hover:underline dark:text-blue-400">
              Return to Services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 bg-gradient-to-br from-primary to-secondary dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/services"
            className="inline-flex items-center mb-6 text-white hover:text-primary hover:bg-white px-4 py-2 rounded-md transition-colors"
          >
            <i className="fas fa-chevron-left mr-2"></i>
            Back to Services
          </Link>

          <h1 className="text-3xl font-bold text-white mb-4">{categoryInfo.title}</h1>
          <p className="text-lg text-white/90 mb-8">{categoryInfo.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryInfo.services.map((service) => (
              <div key={service.name} className="bg-white/10 text-white backdrop-blur-lg rounded-lg overflow-hidden">
                <div className="p-4 border-b border-white/20">
                  <h2 className="text-xl font-bold">{service.name}</h2>
                </div>
                <div className="p-4">
                  <p className="mb-4">{service.description}</p>
                  <p className="font-semibold">{service.price}</p>
                  <Link
                    href="/login"
                    className="block w-full text-center mt-4 bg-white text-primary hover:bg-white/90 px-4 py-2 rounded-md transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ServiceCategoryPage
