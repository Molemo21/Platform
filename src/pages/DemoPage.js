"use client"

import { useState } from "react"
import Link from "next/link"

function FigmaPrototype() {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-video">
      <iframe
        className="w-full h-full"
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
        src="https://embed.figma.com/proto/iYN0cwmAGPiKj8PPxSGz5Y/Prototype?node-id=110-19931&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A46&show-proto-sidebar=1&embed-host=share"
        allowFullScreen
      />
    </div>
  )
}

function DemoPage({ isDarkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState("mobile")

  return (
    <div
      className={`flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-green-500 ${isDarkMode ? "dark" : ""}`}
    >
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white bg-opacity-10">
        <Link className="flex items-center justify-center" href="/">
          <i className="fas fa-arrow-left mr-2 text-white"></i>
          <span className="font-bold text-2xl text-white">Back to ProLiink</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">Experience ProLiink Connect</h1>
        <div className="w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-white border-opacity-20">
            <h2 className="text-2xl text-white">Interactive Demo</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                className={`py-2 flex items-center justify-center text-sm font-medium rounded-md transition-colors ${
                  activeTab === "mobile" ? "bg-white text-blue-600" : "bg-white/20 text-white hover:bg-white/30"
                }`}
                onClick={() => setActiveTab("mobile")}
              >
                <i className="fas fa-mobile-alt mr-2"></i> Mobile
              </button>
              <button
                className={`py-2 flex items-center justify-center text-sm font-medium rounded-md transition-colors ${
                  activeTab === "tablet" ? "bg-white text-blue-600" : "bg-white/20 text-white hover:bg-white/30"
                }`}
                onClick={() => setActiveTab("tablet")}
              >
                <i className="fas fa-tablet-alt mr-2"></i> Tablet
              </button>
              <button
                className={`py-2 flex items-center justify-center text-sm font-medium rounded-md transition-colors ${
                  activeTab === "desktop" ? "bg-white text-blue-600" : "bg-white/20 text-white hover:bg-white/30"
                }`}
                onClick={() => setActiveTab("desktop")}
              >
                <i className="fas fa-desktop mr-2"></i> Desktop
              </button>
            </div>

            <div className={activeTab === "mobile" ? "block" : "hidden"}>
              <div className="aspect-[9/16] max-w-[320px] mx-auto h-[600px]">
                <FigmaPrototype />
              </div>
            </div>

            <div className={activeTab === "tablet" ? "block" : "hidden"}>
              <div className="aspect-[4/3] max-w-[768px] mx-auto h-[600px]">
                <FigmaPrototype />
              </div>
            </div>

            <div className={activeTab === "desktop" ? "block" : "hidden"}>
              <div className="aspect-[16/9] max-w-[1024px] mx-auto h-[600px]">
                <FigmaPrototype />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white text-lg mb-4">
            Explore the ProLiink Connect platform across different devices. Navigate through our intuitive interface and
            experience the seamless booking process.
          </p>
          <Link
            href="/register/client"
            className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md inline-block"
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

export default DemoPage
