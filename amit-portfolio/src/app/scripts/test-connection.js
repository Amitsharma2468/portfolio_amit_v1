import { MongoClient } from "mongodb"

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://amitsharmast678:jJEC0efCbhjzLurC@cluster0.bgrua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function testConnection() {
  const client = new MongoClient(MONGO_URI)

  try {
    await client.connect()
    console.log("✅ Connected to MongoDB successfully")

    const db = client.db("portfolio")

    // Test each collection
    const collections = ["projects", "skills", "education", "certificates"]

    for (const collectionName of collections) {
      const count = await db.collection(collectionName).countDocuments()
      console.log(`📊 ${collectionName}: ${count} documents`)

      if (count > 0) {
        const sample = await db.collection(collectionName).findOne()
        console.log(`📄 Sample ${collectionName}:`, Object.keys(sample))
      }
    }
  } catch (error) {
    console.error("❌ Database connection error:", error)
  } finally {
    await client.close()
  }
}

testConnection()
