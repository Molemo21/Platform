"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProLiinkLogo } from "@/components/proliink-logo"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterClientPage() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("client")

  const handleCardHover = (card: string | null) => {
    setHoveredCard(card)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "contractor") {
      router.push("/register/contractor")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <ProLiinkLogo className="h-12 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-pro-gray dark:text-white">
            Create Account
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Join ProLiink Connect to find skilled professionals</p>
        </div>

        <Tabs defaultValue="client" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="client" className="text-base">
              Client
            </TabsTrigger>
            <TabsTrigger value="contractor" className="text-base">
              Contractor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="client">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Client Registration</CardTitle>
                <CardDescription className="text-center">Enter your details to create a client account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+27 12 345 6789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="w-full bg-link-blue hover:bg-link-blue/90">Create Client Account</Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-link-blue hover:underline">
                    Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
