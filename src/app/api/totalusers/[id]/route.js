import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function GET( req , {params}) {
    const {id} = params;
    await connectMongoDB();
    const user = await User.findOne({_id: id});
    return NextResponse.json({user} , {status:200});
    
}