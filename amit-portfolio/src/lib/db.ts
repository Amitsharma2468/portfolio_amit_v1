import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not set")
}

let client: MongoClient
let db: Db

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI!)
    await client.connect()
    db = client.db("portfolio")
  }
  return { client, db }
}

export async function getDatabase() {
  if (!db) {
    await connectToDatabase()
  }
  return db
}
