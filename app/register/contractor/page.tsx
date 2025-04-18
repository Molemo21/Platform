"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProLiinkLogo } from "@/components/proliink-logo"

const serviceCategories = [
  { value: "plumber", label: "Plumber" },
  { value: "electrician", label: "Electrician" },
  { value: "gardener", label: "Gardener" },
  { value: "painter", label: "Painter" },
  { value: "hairdresser", label: "Hairdresser" },
  { value: "spa-treatment", label: "Spa Treatment" },
]

export default function RegisterContractorPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    serviceCategory: "",
    experience: "",
    termsAccepted: false,
  })

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, serviceCategory: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle registration logic here
    router.push("/dashboard/contractor")
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-white">
                Business Name (Optional)
              </Label>
              <Input
                id="businessName"
                placeholder="John's Plumbing"
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+27 (123) 456-7890"
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-white/20 border-white/30 text-white"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button className="w-full" onClick={() => setStep(2)}>
              Next
            </Button>
          </>
        )
      case 2:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="service-category" className="text-white">
                Service Category
              </Label>
              <Select onValueChange={handleSelectChange} value={formData.serviceCategory}>
                <SelectTrigger id="service-category" className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">
                Service Area (City/Area)
              </Label>
              <Input
                id="location"
                placeholder="Mthatha"
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-white">
                Years of Experience
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                placeholder="5"
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <Button className="w-full" onClick={() => setStep(3)}>
              Next
            </Button>
          </>
        )
      case 3:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="profile-picture" className="text-white">
                Profile Picture (Optional)
              </Label>
              <Input
                id="profile-picture"
                type="file"
                accept="image/*"
                className="bg-white/20 border-white/30 text-white file:bg-white/20 file:text-white file:border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kyc-documents" className="text-white">
                KYC Documents (ID/Passport)
              </Label>
              <Input
                id="kyc-documents"
                type="file"
                accept="image/*,.pdf"
                required
                className="bg-white/20 border-white/30 text-white file:bg-white/20 file:text-white file:border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trade-certification" className="text-white">
                Trade Certification/License
              </Label>
              <Input
                id="trade-certification"
                type="file"
                accept="image/*,.pdf"
                required
                className="bg-white/20 border-white/30 text-white file:bg-white/20 file:text-white file:border-0"
              />
            </div>
            <div className="flex items-center space-x-2 py-2">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }))}
              />
              <Label htmlFor="terms" className="text-white text-sm">
                I agree to the terms and conditions
              </Label>
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Register
            </Button>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video className="absolute inset-0 min-h-full min-w-full object-cover" autoPlay muted loop playsInline>
          <source src="/videos/worship-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 z-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative z-20 px-4 py-12">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <ProLiinkLogo className="h-10 sm:h-12 w-auto text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Register as a Contractor</h1>
            <p className="text-sm sm:text-base text-gray-300">Create your account to offer your services</p>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-xl">
            <CardContent className="pt-6">
              <form className="space-y-4">{renderStep()}</form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-0">
              {step > 1 && (
                <Button variant="outline" className="w-full" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              <div className="text-center">
                <p className="text-sm text-gray-300">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
