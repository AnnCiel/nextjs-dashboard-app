"use client";
import React from "react";
import Link from "next/link";
import Logo from "../../../public/next.png";
import Image from "next/image";
import { signOut } from "next-auth/react";

function Navbar(session) {
  return (
    <nav className="shadow-xl ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4">
          <div>
            <Link href="/">
              <Image
                src={Logo}
                width={100}
                height={100}
                alt="NextJS Logo"
              ></Image>
            </Link>
          </div>
          <ul className="flex space-x-4">
            {!session ? (
              <>
                <li className="mx-3">
                  <Link href="/login">Login</Link>
                </li>
                <li className="mx-3">
                  <Link href="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="mx-3">
                <div className="flex space-x-3">
                <Link
                  href="/welcome"
                  className="bg-gray-500 text-white py-2 px-3 rounded-md text-lg my-2"
                >Profile</Link>
                <a
                  onClick={() => signOut()}
                  className="bg-red-500 text-white py-2 px-3 rounded-md text-lg my-2"
                >
                  Logout
                </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
