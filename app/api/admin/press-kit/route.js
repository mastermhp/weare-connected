import { NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"
import { verifyAuth } from "@/app/lib/auth"

// GET all press kit items
export async function GET(request) {
  try {
    // Verify admin authentication
    const { authenticated, isAdmin } = await verifyAuth(request)

    if (!authenticated || !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const type = searchParams.get("type") || ""

    const { db } = await connectToDatabase()

    // Build query
    const query = {}
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }
    if (type) query.type = type

    const pressKitItems = await db.collection("press_kit").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(pressKitItems)
  } catch (error) {
    console.error("Error fetching press kit items:", error)
    return NextResponse.json({ error: "Failed to fetch press kit items" }, { status: 500 })
  }
}

// POST create new press kit item
export async function POST(request) {
  try {
    // Verify admin authentication
    const { authenticated, isAdmin } = await verifyAuth(request)

    if (!authenticated || !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.type) {
      return NextResponse.json({ error: "Title and type are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Create press kit item with timestamps
    const pressKitItem = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("press_kit").insertOne(pressKitItem)

    return NextResponse.json(
      {
        message: "Press kit item created successfully",
        id: result.insertedId,
        pressKitItem: { ...pressKitItem, _id: result.insertedId },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating press kit item:", error)
    return NextResponse.json({ error: "Failed to create press kit item" }, { status: 500 })
  }
}
