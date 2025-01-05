import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prismaClient = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const SALT_ROUNDS = 10;

// Define schema for validation using Zod
const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
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

    const { username, password } = parsedData.data;

    // Hash the password with salt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user in the database
    const user = await prismaClient.user.create({
      data: { username, password: hashedPassword },
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: { user: { id: user.id, username: user.username }, token },
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
