"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, MessageCircle, MapPin, Clock, AlertTriangle, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface AnchorBarProps {
  pendingJobsCount: number
  className?: string
}

export function ContractorAnchorBar({ pendingJobsCount, className }: AnchorBarProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-secondary p-2 shadow-lg dark:bg-gray-800 transition-all duration-300",
        expanded ? "h-auto" : "h-16",
        className,
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 md:space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
                    <Bell className="h-6 w-6" />
                    {pendingJobsCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white">
                        {pendingJobsCount}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Pending Jobs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Calendar className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Today's Schedule</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <MessageCircle className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Client Messages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <MapPin className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Job Locations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Clock className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Time Tracking</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Support
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 pb-2">
            <Button variant="secondary" className="justify-start">
              <Bell className="h-4 w-4 mr-2" />
              View All Notifications
            </Button>
            <Button variant="secondary" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Weekly Schedule
            </Button>
            <Button variant="secondary" className="justify-start">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="secondary" className="justify-start">
              <MapPin className="h-4 w-4 mr-2" />
              Set Work Area
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
