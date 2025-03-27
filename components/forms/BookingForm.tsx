"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type Appointment = {
  date: Date
  time: string
  doctor: string
  reason: string
}

type Doctor = {
  id: string
  name: string
  specialty: string
  availability: string[]
}

type Location = {
  id: string
  name: string
  address: string
}

export default function BookingForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (appointment: Appointment) => void
  onCancel: () => void
}) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [doctor, setDoctor] = useState("")
  const [reason, setReason] = useState("")
  const [appointmentType, setAppointmentType] = useState("in-person")
  const [location, setLocation] = useState("")
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  // Mock data for doctors and locations
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Wanjiku",
      specialty: "Endocrinologist",
      availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    },
    {
      id: "2",
      name: "Dr. Omondi",
      specialty: "Ophthalmologist",
      availability: ["09:30", "10:30", "13:30", "14:30", "16:30"],
    },
    {
      id: "3",
      name: "Dr. Kimani",
      specialty: "Cardiologist",
      availability: ["08:00", "09:00", "12:00", "13:00", "17:00"],
    },
    {
      id: "4",
      name: "Ms. Kamau",
      specialty: "Nutritionist",
      availability: ["10:00", "11:00", "12:00", "15:00", "16:00"],
    },
  ]

  const locations: Location[] = [
    {
      id: "1",
      name: "Nairobi Diabetes Center",
      address: "Westlands, Nairobi",
    },
    {
      id: "2",
      name: "Kenyatta National Hospital",
      address: "Hospital Road, Nairobi",
    },
    {
      id: "3",
      name: "Aga Khan University Hospital",
      address: "3rd Parklands Avenue, Nairobi",
    },
  ]

  // Update available times when doctor or date changes
  useEffect(() => {
    if (doctor && date) {
      const selectedDoctor = doctors.find((d) => d.name === doctor)
      if (selectedDoctor) {
        // In a real app, this would be an API call to get available times for the specific date
        setAvailableTimes(selectedDoctor.availability)
      }
    } else {
      setAvailableTimes([])
    }
  }, [doctor, date])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !doctor) {
      return
    }

    const appointment: Appointment = {
      date,
      time,
      doctor,
      reason,
    }

    onSubmit(appointment)
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Appointment Type</Label>
          <RadioGroup
            value={appointmentType}
            onValueChange={setAppointmentType}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in-person" id="in-person" />
              <Label htmlFor="in-person">In-person visit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="virtual" id="virtual" />
              <Label htmlFor="virtual">Virtual consultation</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="doctor">Doctor</Label>
          <Select value={doctor} onValueChange={setDoctor}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doc) => (
                <SelectItem key={doc.id} value={doc.name}>
                  {doc.name} - {doc.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {appointmentType === "in-person" && (
          <div>
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.name}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {location && (
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {locations.find((loc) => loc.name === location)?.address}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full mt-1 justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0)) || isWeekend(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime} disabled={!date || !doctor}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.length > 0 ? (
                  availableTimes.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    {!date || !doctor ? "Select a date and doctor first" : "No available times"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="reason">Reason for Appointment</Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please describe your symptoms or reason for visit"
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!date || !time || !doctor || (appointmentType === "in-person" && !location)}>
          Book Appointment
        </Button>
      </div>
    </form>
  )
}

