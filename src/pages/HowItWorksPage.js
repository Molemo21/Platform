import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"

const steps = [
  {
    title: "Search for a Service",
    description:
      "Browse through our wide range of professional services or use the search function to find exactly what you need.",
    icon: "fa-search",
  },
  {
    title: "Choose a Professional",
    description: "Review profiles, ratings, and reviews to select the best professional for your job.",
    icon: "fa-user-check",
  },
  {
    title: "Book an Appointment",
    description: "Select a convenient date and time for your service appointment.",
    icon: "fa-calendar",
  },
  {
    title: "Receive the Service",
    description: "The professional will arrive at the scheduled time to perform the requested service.",
    icon: "fa-star",
  },
  {
    title: "Pay Securely",
    description: "After the service is completed, pay securely through our platform.",
    icon: "fa-credit-card",
  },
  {
    title: "Leave a Review",
    description: "Share your experience by rating the professional and leaving a review.",
    icon: "fa-star",
  },
]

function HowItWorksPage({ isDarkMode, toggleDarkMode }) {
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 py-12 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">How ProLiink Connect Works</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Connecting you with trusted professionals in just a few simple steps
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {index + 1}
                    </div>
                    {step.title}
                  </h2>
                </div>
                <div className="flex items-center gap-4 p-4">
                  <i className={`fas ${step.icon} text-2xl text-primary dark:text-blue-400`}></i>
                  <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary text-white dark:bg-blue-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <i className="fas fa-headset"></i>
                Need Help?
              </h2>
            </div>
            <div className="p-4">
              <p className="mb-4">
                Our customer support team is always ready to assist you with any questions or concerns.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-md"
              >
                Contact Support
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Get Started?</h2>
            <Link
              href="/services"
              className="inline-block bg-primary text-white hover:bg-primary-light px-6 py-3 rounded-md text-lg font-medium dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Find a Professional Now
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HowItWorksPage
