import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Wrench, Zap, Scissors, PaintbrushIcon as PaintBrush, SpadeIcon as Spa, Leaf } from "lucide-react"

const services = [
  {
    name: "Plumber",
    icon: Wrench,
    description:
      "Expert solutions for leak repairs, pipe installations, clogged drains, and general maintenance to keep your water systems running smoothly.",
    topPro: { name: "Bubele Mbizeni", rating: 4.9, reviews: 120 },
  },
  {
    name: "Electrician",
    icon: Zap,
    description:
      "Professional wiring, lighting installation, appliance repairs, and fault detection for homes and businesses.",
    topPro: { name: "Sarah Johnson", rating: 4.8, reviews: 95 },
  },
  {
    name: "Gardener",
    icon: Leaf,
    description: "Lawn mowing, tree trimming, landscaping, and plant care to keep your outdoor space looking its best.",
    topPro: { name: "Mike Brown", rating: 4.7, reviews: 88 },
  },
  {
    name: "Hairdresser",
    icon: Scissors,
    description:
      "Professional hair cutting, styling, coloring, and treatment services for all hair types and preferences.",
    topPro: { name: "Emma Davis", rating: 4.9, reviews: 150 },
  },
  {
    name: "Painter",
    icon: PaintBrush,
    description:
      "Expert interior and exterior painting services for homes and businesses, including color consultation and surface preparation.",
    topPro: { name: "David Wilson", rating: 4.8, reviews: 110 },
  },
  {
    name: "Spa Treatments",
    icon: Spa,
    description:
      "Relaxing and rejuvenating spa services including massages, facials, body treatments, and aromatherapy.",
    topPro: { name: "Lisa Chen", rating: 4.9, reviews: 200 },
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="sr-only">ProLiink Connect</span>
          <span className="font-bold text-xl md:text-2xl">
            Prol<span className="text-blue-500">i</span>ink
          </span>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-4">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/how-it-works">
            How It Works
          </Link>
          <Link className="hidden sm:inline-block text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-8 md:py-12 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Browse & Select Service</h1>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
              <Input className="flex-grow" placeholder="Search for a service..." />
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.name} value={service.name.toLowerCase()}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full sm:w-auto">Search</Button>
            </div>

            <Tabs defaultValue={services[0].name.toLowerCase()} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6 overflow-x-auto">
                {services.map((service) => (
                  <TabsTrigger key={service.name} value={service.name.toLowerCase()} className="px-2 md:px-4">
                    {service.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {services.map((service) => (
                <TabsContent key={service.name} value={service.name.toLowerCase()}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <service.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        <span>{service.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm md:text-base">{service.description}</p>
                      <Button className="w-full bg-primary text-white hover:bg-secondary">Book Now</Button>
                      <div className="bg-gray-100 p-4 rounded-lg mt-4">
                        <h3 className="font-semibold mb-2 text-sm md:text-base">Top Rated Professional</h3>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-sm md:text-base">{service.topPro.name}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm">{service.topPro.rating}</span>
                            <span className="ml-1 text-xs md:text-sm text-muted-foreground">
                              ({service.topPro.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
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
