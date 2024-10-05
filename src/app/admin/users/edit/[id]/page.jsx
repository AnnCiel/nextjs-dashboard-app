"use client"
import React , {useState ,useEffect}from 'react'
import AdminNav from "../../../components/AdminNav";
import Footer from "../../../components/Footer";
import Container from "../../../components/Container";
import Link from "next/link";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function AdminEditUserPage( { params}) {
  const { data : session} = useSession();
  if (!session) redirect("/login");
  if (!session?.user?.role === "admin") redirect("welcome");

  const { id } = params;

  const [userOldData , setUserOldData] = useState([]);
  const getUserById = async (id) => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`,{
        method: "GET",
        cache: "no-store"
      })

      if(!res.ok){
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();
      setUserOldData(data.user);

    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getUserById(id);
  }, [])


  return (
    <Container>
        <AdminNav session={session}></AdminNav>
        <div className='flex-grow'>
        <div className="container mx-auto shadow-xl my-10 p-10 rounded-xl">
          <Link
            href="/admin/users"
            className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
          >
            Go back
          </Link>
          <hr className="my-3"></hr>
          <h3 className="text-xl">Admin edit user page</h3>
          <form action="">
            <input
              type="text"
              className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 "
              placeholder={userOldData?.name}
              value=""
            ></input>
            <input
              type="text"
              className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 "
              placeholder={userOldData?.email}
              value=""
            ></input>
            <input
              type="text"
              className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 "
              placeholder={userOldData?.password}
              value=""
            ></input>
            
            <button
              className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
              type="submit"
            >Update User</button>
          </form>
        </div>

        </div>
        <Footer></Footer>
    </Container>
  )
}

export default AdminEditUserPage