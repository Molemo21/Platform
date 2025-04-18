"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, Send } from "lucide-react"

export default function AdminDashboard() {
  const [platformStats, setPlatformStats] = useState({
    totalUsers: 5000,
    activeContractors: 500,
    completedJobs: 10000,
    totalRevenue: 500000,
    activeDisputes: 15,
    averageRating: 4.7,
  })

  const [recentReviews, setRecentReviews] = useState([
    { id: 1, client: "John Doe", contractor: "Jane Smith", rating: 4, comment: "Great service!" },
    { id: 2, client: "Alice Johnson", contractor: "Bob Wilson", rating: 5, comment: "Excellent work!" },
  ])

  const [disputes, setDisputes] = useState([
    {
      id: 1,
      client: "Emma Watson",
      contractor: "Tom Hardy",
      status: "Open",
      description: "Job not completed as agreed",
    },
    {
      id: 2,
      client: "Chris Evans",
      contractor: "Scarlett Johansson",
      status: "Resolved",
      description: "Payment dispute",
    },
  ])

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", type: "Client", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", type: "Contractor", status: "Active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", type: "Contractor", status: "Pending" },
  ])

  const [serviceCategories, setServiceCategories] = useState([
    { id: 1, name: "Plumbing", basePrice: 500 },
    { id: 2, name: "Electrical", basePrice: 600 },
    { id: 3, name: "Gardening", basePrice: 400 },
  ])

  const [financialData, setFinancialData] = useState({
    monthlyRevenue: [50000, 55000, 60000, 58000, 62000, 65000],
    topEarningCategories: [
      { category: "Plumbing", revenue: 150000 },
      { category: "Electrical", revenue: 120000 },
      { category: "Gardening", revenue: 90000 },
    ],
  })

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault()
    // Handle announcement submission logic here
    console.log("Announcement submitted")
  }

  return (
    <DashboardSidebar userType="admin">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary dark:text-white">{platformStats.totalUsers}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Active Contractors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary dark:text-white">{platformStats.activeContractors}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Completed Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary dark:text-white">{platformStats.completedJobs}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary dark:text-white">R{platformStats.totalRevenue}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Active Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary dark:text-white">{platformStats.activeDisputes}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-primary dark:text-white">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary dark:text-white">{platformStats.averageRating}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="user-management" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="user-management">User Management</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="advertisements">Advertisements</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>
          <TabsContent value="user-management">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-white">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Input placeholder="Search users..." className="flex-grow" />
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="User Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="clients">Clients</SelectItem>
                        <SelectItem value="contractors">Contractors</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Search</Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.type}</TableCell>
                          <TableCell>{user.status}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="mr-2">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Deactivate
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-white">Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {recentReviews.map((review) => (
                  <div key={review.id} className="mb-4 p-4 border rounded dark:border-gray-700">
                    <p className="font-bold text-primary dark:text-white">
                      {review.client} → {review.contractor}
                    </p>
                    <div className="flex items-center mt-2">
                      <strong className="text-gray-600 dark:text-gray-300 mr-2">Rating:</strong>
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${index < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill={index < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{review.comment}</p>
                    <div className="mt-2 space-x-2">
                      <Button variant="outline">Approve</Button>
                      <Button variant="outline">Remove</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="announcements">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-primary dark:text-white">Send Announcement</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="announcement-title">Title</Label>
                    <Input id="announcement-title" placeholder="Announcement Title" />
                  </div>
                  <div>
                    <Label htmlFor="announcement-content">Content</Label>
                    <Textarea id="announcement-content" placeholder="Announcement content..." />
                  </div>
                  <div>
                    <Label htmlFor="announcement-target">Target Audience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="clients">Clients</SelectItem>
                        <SelectItem value="contractors">Contractors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" />
                    Send Announcement
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardSidebar>
  )
}
