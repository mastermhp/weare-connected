import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"
import bcrypt from "bcryptjs"

export async function getUserCollection() {
  const client = await clientPromise
  return client.db(process.env.MONGODB_DB).collection("users")
}

export async function createUser({ name, email, password, profileImage = "" }) {
  const users = await getUserCollection()

  // Check if user already exists
  const existingUser = await users.findOne({ email })
  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const result = await users.insertOne({
    name,
    email,
    password: hashedPassword,
    profileImage,
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    lastLogin: null,
  })

  return { id: result.insertedId, name, email, profileImage, role: "user" }
}

export async function findUserByEmail(email) {
  const users = await getUserCollection()
  return users.findOne({ email })
}

export async function findUserById(id) {
  const users = await getUserCollection()
  return users.findOne({ _id: new ObjectId(id) })
}

export async function updateUserLastLogin(id) {
  const users = await getUserCollection()
  return users.updateOne({ _id: new ObjectId(id) }, { $set: { lastLogin: new Date(), updatedAt: new Date() } })
}

export async function getAllUsers() {
  const users = await getUserCollection()
  return users.find({ role: "user" }).toArray()
}

export async function updateUserStatus(id, isActive) {
  const users = await getUserCollection()
  return users.updateOne({ _id: new ObjectId(id) }, { $set: { isActive, updatedAt: new Date() } })
}

export async function deleteUser(id) {
  const users = await getUserCollection()
  return users.deleteOne({ _id: new ObjectId(id) })
}
