"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface SearchAutocompleteProps {
  onSearch?: (query: string) => void
  className?: string
}

// List of services for autocomplete - using actual site data
const services = [
  "Plumber",
  "Electrician",
  "Gardener",
  "Painter",
  "Hairdresser",
  "Spa Treatment",
  "Nail Tech",
  "Pipe Repair",
  "Drain Cleaning",
  "Fixture Installation",
  "Wiring",
  "Light Installation",
  "Circuit Repair",
  "Lawn Mowing",
  "Tree Trimming",
  "Landscaping",
  "House Cleaning",
  "Carpet Cleaning",
  "Window Washing",
  "Interior Painting",
  "Exterior Painting",
  "Wallpaper Installation",
  "Haircut",
  "Hair Coloring",
  "Hair Styling",
  "Hair Treatment",
  "Massage",
  "Facial",
  "Body Wrap",
  "Aromatherapy",
  "Manicure",
  "Pedicure",
  "Nail Art",
  "Gel Nails",
]

export function SearchAutocomplete({ onSearch, className = "" }: SearchAutocompleteProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Filter suggestions based on input
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    const filteredSuggestions = services.filter((service) => service.toLowerCase().includes(query.toLowerCase()))
    setSuggestions(filteredSuggestions)
    setIsOpen(filteredSuggestions.length > 0)
    setSelectedIndex(-1)
  }, [query])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return

    // Arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex))
    }
    // Arrow up
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0))
    }
    // Enter
    else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0) {
        handleSelectSuggestion(suggestions[selectedIndex])
      } else if (query.trim() !== "") {
        handleSearch()
      }
    }
    // Escape
    else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion)
    setIsOpen(false)
    if (onSearch) {
      onSearch(suggestion)
    }
  }

  const handleSearch = () => {
    if (query.trim() !== "") {
      if (onSearch) {
        onSearch(query)
      } else {
        // Default behavior: navigate to dashboard with search query
        router.push(`/dashboard/client?search=${encodeURIComponent(query)}`)
      }
    }
  }

  // Highlight matching parts of the suggestion
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span key={i} className="bg-primary/20 font-medium text-primary">
            {part}
          </span>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for a service..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() !== "" && setSuggestions.length > 0 && setIsOpen(true)}
          className="pl-10 pr-4 py-3 bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent text-black dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-4 py-2 cursor-pointer text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    index === selectedIndex ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  {highlightMatch(suggestion, query)}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
