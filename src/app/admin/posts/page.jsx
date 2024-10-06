"use client";
import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";
import Container from "../components/Container";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DeleteBtn from "./DeleteBtn";

function AdminPostManagePage() {
  const { data: session } = useSession();
  
  if (!session) redirect("/login");
  if (session?.user?.role && session?.user?.role !== "admin") redirect("/welcome");

  const [allPostData, setAllPostData] = useState([]);

  const getAllPostData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts`, {});
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setAllPostData(data.totalPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
      // Handle the error appropriately, e.g., show an error message to the user
      alert("Failed to load posts. Please try again later.");
    }
  };

  useEffect(() => {
    getAllPostData().catch(error => {
      console.error("Error fetching posts:", error);
      // You might want to handle this error differently, e.g., show a loading state
    });
  }, []);

  return (
    <Container>
      <AdminNav session={session}></AdminNav>

      <div className="flex-grow  bg-violet-100">
        <div className="container mx-auto">
          <div className="flex mt-10">
            <SideNav></SideNav>
            <div className="p-10">
            <div  className="flex justify-end">
              <Link
                href="/create"
                className="bg-green-500 text-white border py-2 px-3 rounded-md text-lg my-2 text-justify"
              >
                Create Post
              </Link>
            </div>
            
              <h3 className="text-3xl mb-3">Manage Posts</h3>
              
              <p>A list of posts retrieved from a MongoDB database</p>
              {allPostData.length > 0 ? (
                <div className="shadow-lg overflow-x-auto">
                  <table className="text-left rounded-md mt-3 table-fixed w-full">
                    <thead>
                      <tr className="bg-gray-400">
                        <th className="p-5">Post ID</th>
                        <th className="p-5">Post Title</th>
                        <th className="p-5">Post Image</th>
                        <th className="p-5">Post Content</th>
                        <th className="p-5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {allPostData.map((val) => (
                        <tr key={val._id}>
                          <td className="p-5">{val._id}</td>
                          <td className="p-5">{val.title}</td>
                          <td className="p-5">
                            <Image
                              src={val.img}
                              width={80}
                              height={80}
                              alt={val.title}
                            ></Image>
                          </td>
                          <td className="p-5">{val.content}</td>
                          <td className="p-5">
                            <Link
                              href={`/admin/posts/edit/${val._id}`}
                              className="bg-gray-500 text-white border py-2 px-3 rounded text-lg my-2"
                            >
                              Edit
                            </Link>
                            <DeleteBtn id={val._id}></DeleteBtn>
                            
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No posts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </Container>
  );
}

export default AdminPostManagePage;