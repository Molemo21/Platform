"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProLiinkLogo } from "@/components/proliink-logo"
import { UserIcon, Wrench } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleCardHover = (card: string | null) => {
    setHoveredCard(card)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/">
            <ProLiinkLogo className="h-12 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join ProLiink Connect</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Choose how you want to use our platform and create your account
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => handleCardHover("client")}
            onHoverEnd={() => handleCardHover(null)}
          >
            <Card
              className={`h-full cursor-pointer transition-all duration-300 ${
                hoveredCard === "client"
                  ? "border-primary shadow-lg dark:border-primary"
                  : "border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => router.push("/register/client")}
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${
                    hoveredCard === "client"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  <UserIcon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl">Register as a Client</CardTitle>
                <CardDescription>Find skilled professionals for your projects</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✓</span> Post jobs and receive quotes
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✓</span> Browse verified professionals
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✓</span> Manage projects and payments
                  </li>
                </ul>
                <Button
                  className={`w-full ${
                    hoveredCard === "client" ? "bg-primary hover:bg-primary/90" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  Register as Client
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => handleCardHover("contractor")}
            onHoverEnd={() => handleCardHover(null)}
          >
            <Card
              className={`h-full cursor-pointer transition-all duration-300 ${
                hoveredCard === "contractor"
                  ? "border-secondary shadow-lg dark:border-secondary"
                  : "border-gray-200 dark:border-gray-700"
              }`}
              onClick={() => router.push("/register/contractor")}
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${
                    hoveredCard === "contractor"
                      ? "bg-secondary text-white"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  <Wrench className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl">Register as a Contractor</CardTitle>
                <CardDescription>Offer your services and grow your business</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✓</span> Create a professional profile
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✓</span> Receive job requests
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="mr-2">✓</span> Get paid securely for your work
                  </li>
                </ul>
                <Button
                  className={`w-full ${
                    hoveredCard === "contractor" ? "bg-secondary hover:bg-secondary/90" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  Register as Contractor
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
