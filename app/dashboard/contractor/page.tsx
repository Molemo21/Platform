"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Star, ThumbsUp, MapPin } from "lucide-react"

export default function ContractorDashboard() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      clientName: "John Doe",
      service: "Plumbing",
      description: "Fix leaky faucet",
      date: "2024-03-01",
      time: "14:00",
      priceRange: "R600 - R800",
      status: "Pending",
      location: "123 Main St, City",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      service: "Electrical",
      description: "Install new light fixture",
      date: "2024-03-02",
      time: "10:00",
      priceRange: "R800 - R1000",
      status: "Pending",
      location: "456 Elm St, Town",
    },
    {
      id: 3,
      clientName: "Alice Johnson",
      service: "Plumbing",
      description: "Unclog kitchen sink",
      date: "Instant",
      time: "As soon as possible",
      priceRange: "R700 - R900",
      status: "Pending",
      location: "789 Oak St, Village",
    },
  ])

  const [activeJobs, setActiveJobs] = useState([
    {
      id: 1,
      clientName: "Bob Wilson",
      service: "Plumbing",
      description: "Replace bathroom sink",
      date: "2024-03-05",
      time: "09:00",
      priceRange: "R1000 - R1200",
      status: "In Progress",
      location: "321 Pine St, Suburb",
    },
  ])

  const [completedJobs, setCompletedJobs] = useState([
    {
      id: 1,
      clientName: "Emma Watson",
      service: "Plumbing",
      description: "Fixed leaky faucet",
      completionDate: "2024-02-15",
      rating: 5,
      review: "Excellent service! Very professional and quick.",
    },
    {
      id: 2,
      clientName: "Tom Hardy",
      service: "Electrical",
      description: "Installed new light fixtures",
      completionDate: "2024-02-10",
      rating: 4,
      review: "Good job, but arrived a bit late.",
    },
  ])

  const handleAccept = (id) => {
    const acceptedJob = notifications.find((n) => n.id === id)
    setActiveJobs([...activeJobs, { ...acceptedJob, status: "Accepted" }])
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleDecline = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleComplete = (id) => {
    setActiveJobs(activeJobs.map((job) => (job.id === id ? { ...job, status: "Completed" } : job)))
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Contractor Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-primary text-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R12,345</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary text-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Completed Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">87</p>
          </CardContent>
        </Card>
        <Card className="bg-primary text-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">32</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary text-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.8</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="notifications">New Job Requests</TabsTrigger>
          <TabsTrigger value="active-jobs">Active Jobs</TabsTrigger>
          <TabsTrigger value="completed-jobs">Completed Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">New Job Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.map((notification) => (
                <div key={notification.id} className="mb-4 p-4 border rounded dark:border-gray-700">
                  <h3 className="font-bold text-primary dark:text-white">{notification.clientName}</h3>
                  <p className="text-gray-600 dark:text-gray-300">Service: {notification.service}</p>
                  <p className="text-gray-600 dark:text-gray-300">Description: {notification.description}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Date: {notification.date} at {notification.time}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">Price Range: {notification.priceRange}</p>
                  <p className="text-gray-600 dark:text-gray-300">Location: {notification.location}</p>
                  <div className="mt-2">
                    <Button className="mr-2" onClick={() => handleAccept(notification.id)}>
                      Accept
                    </Button>
                    <Button variant="outline" onClick={() => handleDecline(notification.id)}>
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active-jobs">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              {activeJobs.map((job) => (
                <div key={job.id} className="mb-4 p-4 border rounded dark:border-gray-700">
                  <h3 className="font-bold text-primary dark:text-white">{job.clientName}</h3>
                  <p className="text-gray-600 dark:text-gray-300">Service: {job.service}</p>
                  <p className="text-gray-600 dark:text-gray-300">Description: {job.description}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Date: {job.date} at {job.time}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">Price Range: {job.priceRange}</p>
                  <p className="text-gray-600 dark:text-gray-300">Location: {job.location}</p>
                  <Badge className="mt-2" variant={job.status === "Accepted" ? "secondary" : "default"}>
                    {job.status}
                  </Badge>
                  <div className="mt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="mr-2">Update Status</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white dark:bg-gray-800">
                        <DialogHeader>
                          <DialogTitle className="text-primary dark:text-white">Update Job Status</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right text-primary dark:text-white">
                              Status
                            </Label>
                            <select
                              id="status"
                              className="col-span-3 bg-white dark:bg-gray-700 text-primary dark:text-white"
                              onChange={(e) => {
                                if (e.target.value === "Completed") {
                                  handleComplete(job.id)
                                }
                              }}
                            >
                              <option>In Progress</option>
                              <option>Completed</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right text-primary dark:text-white">
                              Notes
                            </Label>
                            <Textarea
                              id="notes"
                              className="col-span-3 bg-white dark:bg-gray-700 text-primary dark:text-white"
                            />
                          </div>
                        </div>
                        <Button type="submit">Save changes</Button>
                      </DialogContent>
                    </Dialog>
                    {job.status === "Accepted" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" className="mr-2 hover:bg-gray-100">
                              Contact Client
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Call Client</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {job.status === "Accepted" && (
                      <Button variant="outline">
                        <MapPin className="mr-2 h-4 w-4" />
                        Location
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed-jobs">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Completed Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              {completedJobs.map((job) => (
                <Card key={job.id} className="mb-4 bg-gray-50 dark:bg-gray-700">
                  <CardHeader>
                    <CardTitle className="text-primary dark:text-white flex justify-between items-center">
                      {job.service}
                      <Badge variant="success">Completed</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Client:</strong> {job.clientName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Description:</strong> {job.description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Completion Date:</strong> {job.completionDate}
                    </p>
                    <div className="flex items-center mt-2">
                      <strong className="text-gray-600 dark:text-gray-300 mr-2">Rating:</strong>
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${index < job.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill={index < job.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      <strong>Review:</strong> {job.review}
                    </p>
                    <Button className="mt-4" variant="outline">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Thank Client
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
