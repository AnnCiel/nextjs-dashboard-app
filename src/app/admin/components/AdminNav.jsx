import React from "react";
import Link from "next/link";
import Logo from "../../../../public/next.png";
import Image from "next/image";
import { signOut } from "next-auth/react";

function AdminNav( { session }) {
  return (
    <nav className="shadow-xl">
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
          <ul className="flex">
            {!session ? (
              <>
                <li className="bg-green-500 text-white py-2 px-4 rounded-md text-lg my-2 ">
                  <Link href="/login">Login</Link>
                </li>
                <li className="bg-blue-500 text-white py-2 px-4 rounded-md text-lg my-2">
                  <Link href="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="mx-3">
                
                <a
                  onClick={() => signOut()}
                  className="bg-red-500 text-white py-2 px-3 rounded-md text-lg my-2"
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
