"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([{ role: "bot", content: "Hello! How can I assist you today?" }])
  const [userInput, setUserInput] = useState("")

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (userInput.trim()) {
      setChatMessages([...chatMessages, { role: "user", content: userInput }])
      // Here you would typically call an API to get the bot's response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "Thank you for your message. A customer service representative will get back to you shortly.",
          },
        ])
      }, 1000)
      setUserInput("")
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="rounded-full w-12 h-12 bg-primary text-white hover:bg-secondary dark:bg-white dark:text-primary dark:hover:bg-gray-200 flex items-center justify-center shadow-lg"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <i className="fas fa-comment"></i>
      </button>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 bg-primary text-white dark:bg-gray-700">
                <h3 className="font-medium">Chat with us</h3>
              </div>
              <div className="p-4 h-64 overflow-y-auto">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`rounded-lg p-2 max-w-[80%] ${
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light dark:bg-gray-600 dark:hover:bg-gray-500"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Chatbot
