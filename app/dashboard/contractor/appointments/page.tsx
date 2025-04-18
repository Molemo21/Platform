"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Phone } from "lucide-react"

export default function ContractorAppointments() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      clientName: "Michael Brown",
      service: "Plumbing",
      description: "Fix bathroom sink",
      time: "09:00 - 10:30",
      location: "123 Oak St, City",
      status: "Confirmed",
    },
    {
      id: 2,
      clientName: "Sarah Johnson",
      service: "Electrical",
      description: "Install ceiling fan",
      time: "13:00 - 15:00",
      location: "456 Pine Ave, Town",
      status: "Confirmed",
    },
  ]

  // Highlight dates with appointments
  const appointmentDates = [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 2)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Appointments</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-gray-800 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-primary dark:text-white">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border dark:border-gray-700"
              modifiers={{
                booked: appointmentDates,
              }}
              modifiersStyles={{
                booked: { fontWeight: "bold", backgroundColor: "rgba(var(--primary), 0.2)" },
              }}
            />
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-primary dark:text-white">
              Appointments for{" "}
              {date?.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div key={appointment.id} className="mb-4 p-4 border rounded dark:border-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-primary dark:text-white">{appointment.clientName}</h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {appointment.service}: {appointment.description}
                          </p>
                        </div>
                        <Badge>{appointment.status}</Badge>
                      </div>

                      <div className="mt-4 flex flex-col space-y-2">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4 mr-2" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-2" />
                          {appointment.location}
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Client
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No appointments scheduled for this day.</p>
                )}
              </TabsContent>

              <TabsContent value="past">
                <p className="text-gray-600 dark:text-gray-300">No past appointments to display.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
