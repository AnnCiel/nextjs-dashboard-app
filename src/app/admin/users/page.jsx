"use client"
import React, { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";
import Container from "../components/Container";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DeleteBtn from "../users/DeleteBtn";

function AdminUserManagePage() {
  const { data : session} = useSession();
  if (!session) redirect("/login");
  if (!session?.user?.role === "admin") redirect("welcome");

  const [allUserData , setAllUserData]= useState([]);
  const getAllUserData = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`,{

      })

      if(!res.ok){
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      setAllUserData(data.totalUsers);

    }catch(error){
      console.log("Error loading users: " , error)

    }
  }
  useEffect(()=> {
    getAllUserData();
  },[])
 

  return (
    <Container>
      <AdminNav session={session}></AdminNav>

      <div className="flex-grow  bg-violet-100">
        <div className="container mx-auto">
          <div className="flex mt-10">
            <SideNav></SideNav>
            <div className="p-10">
              <h3 className="text-3xl mb-3">Manage User</h3>
              <p> A list of user retrieved from a MongoDB database</p>
              <div className="shadow-lg overflow-x-auto">
                <table className="text-left rounded-md mt-3 table-fixed w-full">
                  <thead>
                    <tr className="bg-gray-400">
                      <th className="p-5">ID</th>
                      <th className="p-5">Username</th>
                      <th className="p-5">Email</th>
                      <th className="p-5">Role</th>
                      <th className="p-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    { allUserData?.map(val =>(
                      <tr key={val._id}>
                      <td className="p-5">{val._id}</td>
                      <td className="p-5">{val.name}</td>
                      <td className="p-5">{val.email}</td>
                      <td className="p-5">{val.role}</td>
                      <td className="p-5">
                        <Link
                          className="bg-gray-500 text-white border py-2 px-3 rounded text-lg my-2"
                          href={`/admin/users/edit/${val._id}`}
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
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </Container>
  );
}

export default AdminUserManagePage;
