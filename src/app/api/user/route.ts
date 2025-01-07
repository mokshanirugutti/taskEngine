import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import User from '@/db/models/user';
import { connectMongoDB } from '@/db/mongodb';

async function getUserFromToken(token: any) {
  await connectMongoDB();
  return await User.findOne({ email: token.email });
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  console.log("Token received:", token);

  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromToken(token);
  return NextResponse.json({ success: true, user });
}