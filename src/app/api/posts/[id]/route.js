import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req , {params}) {
    const {id} = params;
    await connectMongoDB();
    const post = await Post.findOne({_id : id});
    return NextResponse.json({post},{status: 200})
}

export async function PUT(req , {params}) {
    const { id } = params;
    const { newTitle : title , newImg : img , NewContent : content} = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id , { title , img , content});
    return NextResponse.json( {message: "Post updated "}, {status: 200})
    
}
export async function DELETE(req, { params }) {
    try {
      const { id } = params; // Get the post ID from the URL params
  
      if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
      }
  
      await connectMongoDB(); // Connect to MongoDB
  
      const deletedPost = await Post.findByIdAndDelete(id);
  
      if (!deletedPost) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Post Deleted" }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to delete post", error: error.message },
        { status: 500 }
      );
    }
  }