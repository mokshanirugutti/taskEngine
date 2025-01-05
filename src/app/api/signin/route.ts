import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prismaClient = new PrismaClient();
export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(data);

    const user = await prismaClient.user.findFirst({
        where: {
            username: data.username,
            password: data.password,
        },
    });

    if (user) {
        return NextResponse.json({ success: true, message: "User found", data: user });
    } else {
        return NextResponse.json({ success: false, message: "User not found" });
    }
}
