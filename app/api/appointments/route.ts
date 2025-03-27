import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "all"

    // Build filter
    const filter: any = {
      userId: user.id,
    }

    if (status !== "all") {
      filter.status = status
    }

    // Get appointments
    const appointments = await prisma.appointment.findMany({
      where: filter,
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const { date, time, doctor, reason, location, appointmentType } = body

    // Validate input
    if (!date || !time || !doctor) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new appointment
    const appointment = await prisma.appointment.create({
      data: {
        title: reason || "Medical Appointment",
        date: new Date(date),
        time,
        doctor,
        reason,
        location: location || "Virtual",
        appointmentType: appointmentType || "in-person",
        status: "upcoming",
        userId: user.id,
      },
    })

    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

