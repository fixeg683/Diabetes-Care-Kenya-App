"use client"

import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Bell, CalendarIcon, Clock, MapPin, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "@/components/DashboardLayout"
import BookingForm from "@/components/forms/BookingForm"

type Appointment = {
  id: string
  title: string
  date: Date
  time: string
  doctor: string
  location: string
  reason: string
  status: "upcoming" | "completed" | "cancelled"
}

const localizer = momentLocalizer(moment)

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch appointments from API
    const fetchAppointments = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/appointments')
        // const data = await response.json()

        // For demo purposes, we'll use mock data
        const mockAppointments: Appointment[] = [
          {
            id: "1",
            title: "Regular Checkup",
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            time: "10:00",
            doctor: "Dr. Wanjiku",
            location: "Nairobi Diabetes Center",
            reason: "Quarterly diabetes checkup",
            status: "upcoming",
          },
          {
            id: "2",
            title: "Eye Examination",
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            time: "14:30",
            doctor: "Dr. Omondi",
            location: "Kenyatta National Hospital",
            reason: "Annual eye screening",
            status: "upcoming",
          },
          {
            id: "3",
            title: "Nutritionist Consultation",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            time: "11:15",
            doctor: "Ms. Kamau",
            location: "Virtual Appointment",
            reason: "Diet planning and review",
            status: "completed",
          },
        ]

        setAppointments(mockAppointments)
      } catch (error) {
        console.error("Error fetching appointments:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load appointments. Please try again later.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()

    // Set up appointment reminders
    const checkForUpcomingAppointments = () => {
      const now = new Date()
      const upcomingAppointments = appointments.filter((appt) => {
        const appointmentDate = new Date(appt.date)
        appointmentDate.setHours(Number.parseInt(appt.time.split(":")[0]), Number.parseInt(appt.time.split(":")[1]))

        // Check if appointment is within the next 24 hours
        const timeDiff = appointmentDate.getTime() - now.getTime()
        const hoursDiff = timeDiff / (1000 * 60 * 60)

        return hoursDiff > 0 && hoursDiff <= 24 && appt.status === "upcoming"
      })

      upcomingAppointments.forEach((appt) => {
        toast({
          title: "Appointment Reminder",
          description: `You have an appointment with ${appt.doctor} tomorrow at ${appt.time}`,
          duration: 10000,
        })
      })
    }

    // Check for reminders when component mounts
    checkForUpcomingAppointments()

    // Set interval to check for reminders (every hour)
    const reminderInterval = setInterval(checkForUpcomingAppointments, 60 * 60 * 1000)

    return () => clearInterval(reminderInterval)
  }, [toast])

  const events = appointments.map((appt) => {
    const start = new Date(appt.date)
    const [hours, minutes] = appt.time.split(":").map(Number)
    start.setHours(hours, minutes)
    const end = new Date(start.getTime() + 60 * 60 * 1000) // 1 hour appointment
    return {
      title: `${appt.title} with ${appt.doctor}`,
      start,
      end,
      resource: appt,
    }
  })

  const handleBookAppointment = (newAppointment: Omit<Appointment, "id" | "title" | "status" | "location">) => {
    // In a real app, this would be an API call
    // const response = await fetch('/api/appointments', {
    //   method: 'POST',
    //   body: JSON.stringify(newAppointment)
    // })

    // For demo purposes, we'll create a new appointment locally
    const appointment: Appointment = {
      id: (appointments.length + 1).toString(),
      title: newAppointment.reason || "Medical Appointment",
      date: newAppointment.date,
      time: newAppointment.time,
      doctor: newAppointment.doctor,
      reason: newAppointment.reason,
      location: "Nairobi Diabetes Center",
      status: "upcoming",
    }

    setAppointments((prev) => [...prev, appointment])
    setIsBookingFormOpen(false)

    toast({
      title: "Appointment Booked",
      description: `Your appointment with ${appointment.doctor} on ${moment(appointment.date).format("MMMM D, YYYY")} at ${appointment.time} has been scheduled.`,
    })
  }

  const handleCancelAppointment = (id: string) => {
    // In a real app, this would be an API call
    // await fetch(`/api/appointments/${id}`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ status: 'cancelled' })
    // })

    setAppointments((prev) => prev.map((appt) => (appt.id === id ? { ...appt, status: "cancelled" } : appt)))

    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    })
  }

  const handleRescheduleAppointment = (id: string) => {
    // In a real app, this would open a reschedule form
    // For now, we'll just show a toast
    toast({
      title: "Reschedule Appointment",
      description: "Rescheduling functionality will be available soon.",
    })
  }

  const upcomingAppointments = appointments.filter((appt) => appt.status === "upcoming")
  const pastAppointments = appointments.filter((appt) => appt.status === "completed" || appt.status === "cancelled")

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Appointments</h1>
          <Button onClick={() => setIsBookingFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        {isBookingFormOpen && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Book New Appointment</CardTitle>
              <CardDescription>Fill in the details to schedule your appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingForm onSubmit={handleBookAppointment} onCancel={() => setIsBookingFormOpen(false)} />
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="upcoming" className="mb-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <p>Loading appointments...</p>
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No upcoming appointments</p>
                <Button variant="outline" className="mt-4" onClick={() => setIsBookingFormOpen(true)}>
                  Book Your First Appointment
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{appointment.title}</CardTitle>
                        <Badge>{appointment.status}</Badge>
                      </div>
                      <CardDescription>{moment(appointment.date).format("MMMM D, YYYY")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>with {appointment.doctor}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.location}</span>
                        </div>
                        {appointment.reason && (
                          <p className="text-sm text-muted-foreground mt-2">{appointment.reason}</p>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRescheduleAppointment(appointment.id)}
                          >
                            Reschedule
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <p>Loading appointments...</p>
              </div>
            ) : pastAppointments.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground">No past appointments</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{appointment.title}</CardTitle>
                        <Badge variant={appointment.status === "completed" ? "outline" : "destructive"}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <CardDescription>{moment(appointment.date).format("MMMM D, YYYY")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>with {appointment.doctor}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.location}</span>
                        </div>
                        {appointment.reason && (
                          <p className="text-sm text-muted-foreground mt-2">{appointment.reason}</p>
                        )}
                        {appointment.status === "completed" && (
                          <Button variant="outline" size="sm" className="mt-2 w-full">
                            View Summary
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardContent className="p-4">
                <div className="h-[600px]">
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "100%" }}
                    views={["month", "week", "day"]}
                    onSelectEvent={(event) => {
                      const appointment = event.resource as Appointment
                      toast({
                        title: appointment.title,
                        description: `${moment(appointment.date).format("MMMM D, YYYY")} at ${appointment.time} with ${appointment.doctor}`,
                      })
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Reminders</CardTitle>
            <CardDescription>Get notified about your upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Reminder Settings</h3>
                <p className="text-sm text-muted-foreground">
                  You will receive reminders 24 hours before your appointments.
                </p>
              </div>
              <Button variant="outline" className="ml-auto">
                Customize
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

