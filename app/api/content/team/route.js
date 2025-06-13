import { NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"

// GET all team members
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")

    const { db } = await connectToDatabase()

    // Build query
    const query = {}
    if (department) query.department = department

    const teamMembers = await db.collection("team").find(query).toArray()

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

// POST new team member (admin only)
export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Create team member with timestamps
    const teamMember = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: data.status || "Active",
    }

    const result = await db.collection("team").insertOne(teamMember)

    return NextResponse.json(
      {
        message: "Team member created successfully",
        id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
