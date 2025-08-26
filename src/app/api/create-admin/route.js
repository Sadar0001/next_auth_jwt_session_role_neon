import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/utils/password";

// This is a one-time setup endpoint to create the first admin user
// Remove this file after creating your first admin user for security
export async function POST(request) {
  try {
    const { name, email, password, secretKey } = await request.json();

    // Simple secret key check (you should set this in your .env)
    if (secretKey !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json(
        { error: "Invalid secret key" },
        { status: 403 }
      );
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nextauth-app");
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      // If user exists, just update their role to admin
      await users.updateOne(
        { email },
        { $set: { role: "admin", updatedAt: new Date() } }
      );
      return NextResponse.json({
        message: "Existing user updated to admin successfully",
        email,
      });
    }

    // Create new admin user
    const hashedPassword = await hashPassword(password);
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role: "admin", // Set as admin
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Admin user created successfully",
        userId: result.insertedId,
        email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
