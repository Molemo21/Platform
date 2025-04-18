"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function CardPaymentPage({ isDarkMode, toggleDarkMode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId")

  const [job, setJob] = useState(null)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    // In a real application, you would fetch the job details from an API
    // For this example, we'll use mock data
    const mockJob = {
      id: jobId,
      service: "Plumbing",
      description: "Fixed leaky faucet",
      contractor: "John Doe",
      totalCost: 750,
    }
    setJob(mockJob)
  }, [jobId])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically process the payment
    // For this example, we'll just show a success message
    alert("Payment Successful! Your payment has been processed.")
    router.push("/dashboard/client")
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary p-8 flex items-center justify-center text-white">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl mb-4"></i>
          <p>Loading payment details...</p>
        </div>
      </div>
    )
  }

  const commission = job.totalCost * 0.1
  const grandTotal = job.totalCost + commission

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary p-8 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Card Payment</h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={job.service}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={job.description}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contractor</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={job.contractor}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service Cost</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={`R${job.totalCost.toFixed(2)}`}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Platform Commission (10%)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={`R${commission.toFixed(2)}`}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Grand Total</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-bold"
                value={`R${grandTotal.toFixed(2)}`}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cardholder Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Pay R{grandTotal.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CardPaymentPage
