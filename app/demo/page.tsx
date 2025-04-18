import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Smartphone, Laptop, ComputerIcon as Desktop } from "lucide-react"
import FigmaPrototype from "../components/FigmaPrototype"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-green-500">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white bg-opacity-10">
        <Link className="flex items-center justify-center" href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-bold text-2xl text-white">Back to ProLiink</span>
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">Experience ProLiink Connect</h1>
        <Card className="w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Interactive Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="mobile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="mobile">
                  <Smartphone className="mr-2" /> Mobile
                </TabsTrigger>
                <TabsTrigger value="tablet">
                  <Laptop className="mr-2" /> Tablet
                </TabsTrigger>
                <TabsTrigger value="desktop">
                  <Desktop className="mr-2" /> Desktop
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mobile">
                <div className="aspect-[9/16] max-w-[320px] mx-auto h-[600px]">
                  <FigmaPrototype />
                </div>
              </TabsContent>
              <TabsContent value="tablet">
                <div className="aspect-[4/3] max-w-[768px] mx-auto h-[600px]">
                  <FigmaPrototype />
                </div>
              </TabsContent>
              <TabsContent value="desktop">
                <div className="aspect-[16/9] max-w-[1024px] mx-auto h-[600px]">
                  <FigmaPrototype />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <div className="mt-8 text-center">
          <p className="text-white text-lg mb-4">
            Explore the ProLiink Connect platform across different devices. Navigate through our intuitive interface and
            experience the seamless booking process.
          </p>
          <Link
            href="/register/client"
            className={cn(
              buttonVariants({
                className: "bg-white text-blue-600 hover:bg-blue-100"
              })
            )}
          >
            Get Started Now
          </Link>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white border-opacity-20">
        <p className="text-xs text-white">© 2024 ProLiink Connect. All rights reserved.</p>
      </footer>
    </div>
  )
}
