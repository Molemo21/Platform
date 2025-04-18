"use client"

import React from "react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

const services = [
  {
    name: "Plumber",
    icon: "fa-wrench",
    description:
      "Expert solutions for leak repairs, pipe installations, clogged drains, and general maintenance to keep your water systems running smoothly.",
    topPro: { name: "Bubele Mbizeni", rating: 4.9, reviews: 120 },
    slug: "plumber",
  },
  {
    name: "Electrician",
    icon: "fa-bolt",
    description:
      "Professional wiring, lighting installation, appliance repairs, and fault detection for homes and businesses.",
    topPro: { name: "Sarah Johnson", rating: 4.8, reviews: 95 },
    slug: "electrician",
  },
  {
    name: "Gardener",
    icon: "fa-leaf",
    description: "Lawn mowing, tree trimming, landscaping, and plant care to keep your outdoor space looking its best.",
    topPro: { name: "Mike Brown", rating: 4.7, reviews: 88 },
    slug: "gardener",
  },
  {
    name: "Hairdresser",
    icon: "fa-cut",
    description:
      "Professional hair cutting, styling, coloring, and treatment services for all hair types and preferences.",
    topPro: { name: "Emma Davis", rating: 4.9, reviews: 150 },
    slug: "hairdresser",
  },
  {
    name: "Painter",
    icon: "fa-paint-brush",
    description:
      "Expert interior and exterior painting services for homes and businesses, including color consultation and surface preparation.",
    topPro: { name: "David Wilson", rating: 4.8, reviews: 110 },
    slug: "painter",
  },
  {
    name: "Spa Treatments",
    icon: "fa-spa",
    description:
      "Relaxing and rejuvenating spa services including massages, facials, body treatments, and aromatherapy.",
    topPro: { name: "Lisa Chen", rating: 4.9, reviews: 200 },
    slug: "spa-treatment",
  },
]

function ServicesPage({ isDarkMode, toggleDarkMode }) {
  const [selectedCategory, setSelectedCategory] = React.useState(services[0].name.toLowerCase())
  const [searchTerm, setSearchTerm] = React.useState("")

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 py-12 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Browse & Select Service</h1>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-4 mb-6">
              <input
                className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Search for a service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="w-[180px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {services.map((service) => (
                  <option key={service.name} value={service.name.toLowerCase()}>
                    {service.name}
                  </option>
                ))}
              </select>
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700">
                Search
              </button>
            </div>

            <div className="mb-6">
              <div className="grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6 gap-2">
                {services.map((service) => (
                  <button
                    key={service.name}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      selectedCategory === service.name.toLowerCase()
                        ? "bg-primary text-white dark:bg-blue-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => setSelectedCategory(service.name.toLowerCase())}
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>

            {services.map((service) => (
              <div
                key={service.name}
                className={`${selectedCategory === service.name.toLowerCase() ? "block" : "hidden"}`}
              >
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white">
                      <i className={`fas ${service.icon} text-primary dark:text-blue-500`}></i>
                      <span>{service.name}</span>
                    </h2>
                  </div>
                  <div className="p-4">
                    <p className="mb-4 text-gray-700 dark:text-gray-300">{service.description}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Book Now
                    </Link>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4">
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Top Rated Professional</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">{service.topPro.name}</span>
                        <div className="flex items-center">
                          <i className="fas fa-star text-yellow-400 mr-1"></i>
                          <span className="text-gray-700 dark:text-gray-300">{service.topPro.rating}</span>
                          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            ({service.topPro.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default ServicesPage
