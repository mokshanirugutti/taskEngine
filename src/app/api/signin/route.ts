import { connectMongoDB } from "@/db/mongodb";
import User from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    console.log('📍 Signin Request Started');
    
    await connectMongoDB();
    const data = await req.json();
    console.log(' Login attempt for email:', data.email);

    const user = await User.findOne({ email: data.email });

    if (!user) {
      console.log('❌ User not found:', data.email);
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response =  NextResponse.json({
      success: true,
      message: "User found and authenticated",
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return response;
    
  } catch (error) {
    console.error("Signin Error:", error);
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
