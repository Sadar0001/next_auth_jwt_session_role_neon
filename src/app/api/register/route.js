import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/utils/password";

export async function POST(request) {
  try {
    console.log("Registration API called");

    const { name, email, password } = await request.json();
    console.log("Registration data received:", {
      name,
      email,
      passwordLength: password?.length,
    });

    if (!name || !email || !password) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log("Password too short");
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    console.log("Connecting to MongoDB...");
    const client = await clientPromise;
    const db = client.db("nextauth-app"); // Explicitly set database name
    const users = db.collection("users");
    console.log("Connected to MongoDB, database:", db.databaseName);

    // Check if user already exists
    console.log("Checking for existing user...");
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password and create user
    console.log("Hashing password...");
    const hashedPassword = await hashPassword(password);

    console.log("Creating user...");
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role is 'user'
      createdAt: new Date(),
    });

    console.log("User created successfully:", result.insertedId);
    return NextResponse.json(
      { message: "User created successfully", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
