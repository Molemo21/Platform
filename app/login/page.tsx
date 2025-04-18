"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { ProLiinkLogo } from "@/components/proliink-logo"
import { MapPin } from "lucide-react"

// Import the auth helpers
import { login } from "@/utils/auth-helpers"

// Define the slideshow data
const slideshowData = [
  {
    image: "/images/umtata.jpeg",
    location: "Mthatha",
  },
  {
    image: "/images/johannesburg.jpeg",
    location: "Johannesburg",
  },
  {
    image: "/images/durban.jpeg",
    location: "Durban",
  },
]

export default function LoginPage() {
  const [isContractor, setIsContractor] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  // Handle slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowData.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Update the handleLogin function to use the auth helper
  const handleLogin = (e) => {
    e.preventDefault()
    // Set the user as logged in
    login(isContractor ? "contractor" : isAdmin ? "admin" : "client")

    if (isAdmin) {
      router.push("/dashboard/admin")
    } else if (isContractor) {
      router.push("/dashboard/contractor")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        {slideshowData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Location caption */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black/50 text-white px-3 py-1.5 rounded-full backdrop-blur-sm">
              <MapPin size={16} className="text-white" />
              <span className="font-medium">{slide.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <ProLiinkLogo className="h-10 sm:h-12 w-auto text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Login to Your Account</h1>
            <p className="text-sm sm:text-base text-gray-300">Enter your email or phone number to login</p>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-xl">
            <CardHeader>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-black/50">
                  <TabsTrigger
                    value="email"
                    className="text-white data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    Email
                  </TabsTrigger>
                  <TabsTrigger
                    value="phone"
                    className="text-white data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    Phone
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  <form onSubmit={handleLogin} className="space-y-4">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="contractor"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={isContractor}
                        onChange={() => {
                          setIsContractor(!isContractor)
                          setIsAdmin(false)
                        }}
                      />
                      <Label htmlFor="contractor" className="text-white text-sm">
                        I am a contractor
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="admin"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={isAdmin}
                        onChange={() => {
                          setIsAdmin(!isAdmin)
                          setIsContractor(false)
                        }}
                      />
                      <Label htmlFor="admin" className="text-white text-sm">
                        I am an admin
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="phone">
                  <form onSubmit={handleLogin} className="space-y-4">
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-phone" className="text-white">
                        Password
                      </Label>
                      <Input
                        id="password-phone"
                        type="password"
                        required
                        className="bg-white/20 border-white/30 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="contractor-phone"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={isContractor}
                        onChange={() => {
                          setIsContractor(!isContractor)
                          setIsAdmin(false)
                        }}
                      />
                      <Label htmlFor="contractor-phone" className="text-white text-sm">
                        I am a contractor
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="admin-phone"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={isAdmin}
                        onChange={() => {
                          setIsAdmin(!isAdmin)
                          setIsContractor(false)
                        }}
                      />
                      <Label htmlFor="admin-phone" className="text-white text-sm">
                        I am an admin
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardFooter className="flex flex-col space-y-4 pt-0">
              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-white hover:text-blue-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-300">
                  Don't have an account?{" "}
                  <Link
                    href="/register/client"
                    className="text-white hover:text-blue-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all"
                  >
                    Sign up
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
