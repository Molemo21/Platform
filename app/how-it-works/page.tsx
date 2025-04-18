import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, UserCheck, Calendar, Star, CreditCard, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const steps = [
  {
    title: "Search for a Service",
    description:
      "Browse through our wide range of professional services or use the search function to find exactly what you need.",
    icon: Search,
  },
  {
    title: "Choose a Professional",
    description: "Review profiles, ratings, and reviews to select the best professional for your job.",
    icon: UserCheck,
  },
  {
    title: "Book an Appointment",
    description: "Select a convenient date and time for your service appointment.",
    icon: Calendar,
  },
  {
    title: "Receive the Service",
    description: "The professional will arrive at the scheduled time to perform the requested service.",
    icon: Star,
  },
  {
    title: "Pay Securely",
    description: "After the service is completed, pay securely through our platform.",
    icon: CreditCard,
  },
  {
    title: "Leave a Review",
    description: "Share your experience by rating the professional and leaving a review.",
    icon: Star,
  },
]

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="sr-only">ProLiink Connect</span>
          <span className="font-bold text-2xl">ProLiink</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/services">
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">How ProLiink Connect Works</h1>
            <p className="text-xl text-muted-foreground">
              Connecting you with trusted professionals in just a few simple steps
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {index + 1}
                    </div>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <step.icon className="w-10 h-10 text-primary" />
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="w-6 h-6" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Our customer support team is always ready to assist you with any questions or concerns.</p>
            </CardContent>
            <CardFooter>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({
                    variant: "secondary"
                  })
                )}
              >
                Contact Support
              </Link>
            </CardFooter>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <Link
              href="/services"
              className={cn(
                buttonVariants({
                  size: "lg"
                })
              )}
            >
              Find a Professional Now
            </Link>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 ProLiink Connect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
