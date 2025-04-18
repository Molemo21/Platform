"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

function ForgotPasswordPage({ isDarkMode, toggleDarkMode }) {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1)
  const [code, setCode] = useState(["", "", "", "", ""])
  const router = useRouter()

  const handleSendCode = (e) => {
    e.preventDefault()
    // Here you would typically send the authentication code
    console.log(`Sending authentication code to ${email}`)
    setStep(2)
  }

  const handleVerifyCode = (e) => {
    e.preventDefault()
    // Here you would typically verify the authentication code
    console.log(`Verifying code: ${code.join("")}`)
    // If verification is successful, redirect to password reset page
    router.push("/reset-password")
  }

  const handleCodeChange = (index, value) => {
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Move to next input if value is entered
    if (value && index < 4) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-primary to-secondary p-4 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {step === 1 ? "Forgot Password" : "Enter Authentication Code"}
          </h1>
        </div>
        <div className="p-6">
          {step === 1 ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email or Phone Number
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Send Authentication Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enter 5-digit Code
                </label>
                <div className="flex justify-between">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 text-center px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Verify Code
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
