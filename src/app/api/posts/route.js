import  { connectMongoDB} from "../../../../lib/mongodb"
import Post from "../../../../models/post"
import { NextResponse } from "next/server"

export async function POST(req){
    const { title , img , content , userEmail} = await req.json();
    await connectMongoDB();
    await Post.create({ title , img , content , userEmail});
    return NextResponse.json({message : "Post Created"} , {status:201});
  
}
export async function GET(req) {
    const userEmail = req.nextUrl.searchParams.get("email");
    await connectMongoDB();
    const posts = await Post.find({ userEmail: userEmail })
    return NextResponse.json({posts});

}