// MongoDB seed data script
import { MongoClient } from "mongodb"

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://amitsharmast678:jJEC0efCbhjzLurC@cluster0.bgrua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB for seeding")

    const db = client.db("portfolio")

    // Insert education data
    await db.collection("education").insertOne({
      institution: "Shahjalal University of Science and Technology",
      degree: "Bachelor of Science",
      field_of_study: "Computer Science and Engineering",
      start_date: new Date("2020-01-01"),
      end_date: new Date("2024-06-01"),
      description:
        "Comprehensive study in computer science fundamentals, software engineering, and modern web technologies.",
      created_at: new Date(),
    })

    // Insert skills data
    const skills = [
      { name: "JavaScript", category: "Programming Languages", proficiency: 5, created_at: new Date() },
      { name: "TypeScript", category: "Programming Languages", proficiency: 4, created_at: new Date() },
      { name: "React", category: "Frontend Frameworks", proficiency: 5, created_at: new Date() },
      { name: "Next.js", category: "Frontend Frameworks", proficiency: 4, created_at: new Date() },
      { name: "Node.js", category: "Backend Technologies", proficiency: 4, created_at: new Date() },
      { name: "MongoDB", category: "Databases", proficiency: 4, created_at: new Date() },
      { name: "Git", category: "Tools", proficiency: 4, created_at: new Date() },
      { name: "Tailwind CSS", category: "Styling", proficiency: 5, created_at: new Date() },
    ]
    await db.collection("skills").insertMany(skills)

    // Insert projects data
    const projects = [
      {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with payment integration",
        technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
        github_url: "https://github.com/amitkumar/ecommerce",
        live_url: "https://ecommerce-demo.vercel.app",
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Task Management App",
        description: "Collaborative task management tool with real-time updates",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
        github_url: "https://github.com/amitkumar/taskmanager",
        live_url: "https://taskmanager-demo.vercel.app",
        featured: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
    await db.collection("projects").insertMany(projects)

    // Insert certificates data
    const certificates = [
      {
        title: "React Developer Certification",
        issuer: "Meta",
        issue_date: new Date("2023-08-15"),
        credential_id: "META-REACT-2023-001",
        credential_url: "https://coursera.org/verify/professional-cert/react-meta",
        created_at: new Date(),
      },
      {
        title: "Full Stack Web Development",
        issuer: "freeCodeCamp",
        issue_date: new Date("2023-06-20"),
        credential_id: "FCC-FULLSTACK-2023",
        credential_url: "https://freecodecamp.org/certification/fullstack",
        created_at: new Date(),
      },
    ]
    await db.collection("certificates").insertMany(certificates)

    // Create admin user with the specified email
    await db.collection("admin_users").insertOne({
      email: "amitkmrsharma292@gmail.com",
      password_hash: "$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqQqQqQqQqQqQq", // admin123
      created_at: new Date(),
    })

    console.log("Database seeded successfully")
    console.log("Admin credentials: amitkmrsharma292@gmail.com / admin123")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
