"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250302_021303.jpg-JBVHDkCNIy3G0rVGYnCRwZYCvUjXVE.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250302_021428.jpg-aPMEqNcvlRCxQiqJ9zP48IRVCS7YmL.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250302_021103_com.opera.browser_edit_160267523388564.jpg-aMce1WYH6wHgPmmQQHx2adbzO7Wo9x.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250302_021216_com.opera.browser_edit_160279350633874.jpg-RBmwBIoPAITPwHNc06CdcED7wW6TYo.jpeg",
]

function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dim overlay */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Service provider at work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  )
}

export default HeroSlideshow
