import { NextResponse } from "next/server"
import { connectToDatabase } from "@/app/lib/mongodb"

export async function GET() {
  try {
    console.log("=== DATABASE DEBUG INFO ===")
    console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Not set")
    console.log("MONGODB_DB:", process.env.MONGODB_DB)

    const { db, client } = await connectToDatabase()

    // Get the actual database name being used
    const actualDbName = db.databaseName
    console.log("Actual database name:", actualDbName)

    // List all databases
    const adminDb = client.db().admin()
    const databases = await adminDb.listDatabases()
    console.log(
      "Available databases:",
      databases.databases.map((d) => d.name),
    )

    // Check collections in current database
    const collections = await db.listCollections().toArray()
    console.log(
      "Collections in current database:",
      collections.map((c) => c.name),
    )

    // Check admin collection specifically
    const adminCount = await db.collection("admins").countDocuments()
    console.log("Admin users count:", adminCount)

    // If admins exist, show their usernames
    if (adminCount > 0) {
      const admins = await db
        .collection("admins")
        .find({}, { projection: { username: 1, email: 1 } })
        .toArray()
      console.log("Admin users:", admins)
    }

    return NextResponse.json({
      success: true,
      debug: {
        mongodbUri: process.env.MONGODB_URI ? "Set" : "Not set",
        mongodbDb: process.env.MONGODB_DB,
        actualDbName,
        availableDatabases: databases.databases.map((d) => d.name),
        collectionsInCurrentDb: collections.map((c) => c.name),
        adminCount,
        admins:
          adminCount > 0
            ? await db
                .collection("admins")
                .find({}, { projection: { username: 1, email: 1 } })
                .toArray()
            : [],
      },
    })
  } catch (error) {
    console.error("Database debug error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
