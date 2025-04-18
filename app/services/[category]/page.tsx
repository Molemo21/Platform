import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

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

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categoryData[params.category as keyof typeof categoryData]

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white/10 backdrop-blur-md">
        <Link className="flex items-center justify-center text-white" href="/">
          <span className="font-bold text-2xl">
            Prol<span className="text-blue-500">i</span>ink
          </span>
        </Link>
      </header>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 text-white hover:text-primary hover:bg-white" asChild>
          <Link href="/services">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-white mb-4">{category.title}</h1>
        <p className="text-lg text-white/90 mb-8">{category.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.services.map((service) => (
            <Card key={service.name} className="bg-white/10 text-white backdrop-blur-lg">
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{service.description}</p>
                <p className="font-semibold">{service.price}</p>
                <Button className="w-full mt-4 bg-white text-primary hover:bg-white/90" asChild>
                  <Link href="/login">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
