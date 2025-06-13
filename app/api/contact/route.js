import { NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"

// POST new contact message
export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Create contact message with timestamps
    const message = {
      ...data,
      createdAt: new Date(),
      status: "Unread",
      replied: false,
    }

    const result = await db.collection("contactMessages").insertOne(message)

    return NextResponse.json(
      {
        message: "Message sent successfully",
        id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
