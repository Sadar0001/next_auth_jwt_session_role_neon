import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("Testing MongoDB connection...");
    console.log("MongoDB URI:", process.env.MONGODB_URI ? "Set" : "Not set");

    const client = await clientPromise;
    console.log("MongoDB client connected successfully");

    // Test database connection
    const db = client.db("nextauth-app"); // Explicitly set database name
    console.log("Database selected:", db.databaseName);

    // List collections
    const collections = await db.listCollections().toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    // Test users collection
    const users = db.collection("users");
    const userCount = await users.countDocuments();
    console.log("Users collection - document count:", userCount);

    // Test simple operation
    const testResult = await users.findOne({});
    console.log("Sample user:", testResult);

    return NextResponse.json({
      success: true,
      database: db.databaseName,
      collections: collections.map((c) => c.name),
      userCount,
      message: "MongoDB connection successful!",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
