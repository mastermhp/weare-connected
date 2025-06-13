import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const MONGODB_DB = process.env.MONGODB_DB || "connected_website"

// Check if we're in a production environment
const isProd = process.env.NODE_ENV === "production"

// Connection cache
let cachedClient = null
let cachedDb = null

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

if (!MONGODB_DB) {
  throw new Error("Please define the MONGODB_DB environment variable")
}

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Log connection attempt
  console.log(`Connecting to MongoDB at: ${MONGODB_URI.split("@")[1] || "localhost"}`)

  // Connect to MongoDB
  const client = new MongoClient(MONGODB_URI, {
    // Remove deprecated options
  })

  try {
    await client.connect()
    const db = client.db(MONGODB_DB)

    // Cache the connection
    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
