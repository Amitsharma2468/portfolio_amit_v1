// MongoDB initialization script
import { MongoClient } from "mongodb"

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://amitsharmast678:jJEC0efCbhjzLurC@cluster0.bgrua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function initializeDatabase() {
  const client = new MongoClient(MONGO_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("portfolio")

    // Create collections and indexes
    await db.createCollection("projects")
    await db.createCollection("certificates")
    await db.createCollection("skills")
    await db.createCollection("education")
    await db.createCollection("contact_messages")
    await db.createCollection("admin_users")

    // Create indexes
    await db.collection("projects").createIndex({ featured: 1 })
    await db.collection("projects").createIndex({ created_at: -1 })
    await db.collection("skills").createIndex({ category: 1 })
    await db.collection("contact_messages").createIndex({ read: 1 })
    await db.collection("contact_messages").createIndex({ created_at: -1 })
    await db.collection("admin_users").createIndex({ email: 1 }, { unique: true })

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
  } finally {
    await client.close()
  }
}

initializeDatabase()
