import { connectMongoDB } from "@/db/mongodb";
import User from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const SALT_ROUNDS = 10;

// Define schema for validation using Zod
const userSchema = z.object({
  email: z.string().min(3, "email must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request data
    const parsedData = userSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsedData.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, password } = parsedData.data;

    // Hash the password with salt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user in the database
    await connectMongoDB();
    const user =   await User.create({ email, password: hashedPassword });


    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: { user: { id: user.id, email: user.email }, token },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
