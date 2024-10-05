import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function GET() {
    await connectMongoDB();
    const totalUsers = await User.find();
    return NextResponse.json({totalUsers});
    
}