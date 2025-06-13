import { NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"

// GET all jobs
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")
    const location = searchParams.get("location")
    const status = searchParams.get("status")

    const { db } = await connectToDatabase()

    // Build query
    const query = {}
    if (department) query.department = department
    if (location) query.location = location
    if (status) query.status = status

    const jobs = await db.collection("jobs").find(query).toArray()

    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

// POST new job (admin only)
export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.department || !data.description) {
      return NextResponse.json({ error: "Title, department and description are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Create job with timestamps
    const job = {
      ...data,
      applications: 0,
      postedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: data.status || "Active",
    }

    const result = await db.collection("jobs").insertOne(job)

    return NextResponse.json(
      {
        message: "Job created successfully",
        id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
