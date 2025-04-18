"use client"

import { useState } from "react"
import Link from "next/link"

function Footer() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)

  return (
    <>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-gray-700 transition-colors duration-300">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 ProLiink Connect. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <button
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            onClick={() => setIsTermsModalOpen(true)}
          >
            Terms of Service
          </button>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>

      {/* Terms of Service Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 max-w-3xl max-h-[80vh] overflow-y-auto rounded-lg shadow-xl">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold dark:text-white">Terms of Service</h2>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsTermsModalOpen(false)}
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-4 prose prose-sm max-w-none dark:prose-invert">
              <p>These are the terms and conditions for using ProLiink Connect services...</p>
              {/* Terms of Service content would go here */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer
