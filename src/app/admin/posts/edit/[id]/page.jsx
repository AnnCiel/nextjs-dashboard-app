"use client";
import React, { useState, useEffect } from "react";
import AdminNav from "@/app/admin/components/AdminNav";
import Footer from "@/app/admin/components/Footer";
import Container from "@/app/components/Container";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

function AdminEditPostPage({ params }) {
  const { data: session } = useSession();

  if (!session) redirect("/login");
  if (session?.user?.role && session?.user?.role !== "admin")
    redirect("/welcome");

  const { id } = params;
  const [oldPostData, setOldPostData] = useState([]);
  // New post data //
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");

  const getPostById = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts/${id}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }

      const data = await res.json();
      setOldPostData(data.post);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPostById(id);
  }, [])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({newTitle , newImg , newContent})

      })
      if(!res.ok){
        throw new Error("Failed to update post");
      }

      router.refresh();
      router.push("/admin/posts");

    }catch(error){
      console.log(error)

    }
  }

  return (
    <Container>
      <AdminNav session={session}></AdminNav>
      <div className="flex-grow">
        <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl">
          <Link
            href="/admin/posts"
            className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
          >
            Go back
          </Link>
          <hr className="my-3"></hr>
          <h3 className="text-xl">Admin edit posts page</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 "
              placeholder={oldPostData.title}
              onChange={(e) => setNewTitle(e.target.value)}
            ></input>
            <input
              type="text"
              className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 "
              placeholder={oldPostData.img}
              onChange={(e) => setNewImg(e.target.value)}
            ></input>
            <textarea
              className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 "
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder={oldPostData.content}
              onChange={(e) => setNewContent(e.target.value)}
            ></textarea>
            <button
              className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
              type="submit"
            >
              Edit Post
            </button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </Container>
  );
}

export default AdminEditPostPage;
