import React from "react";
import Link from "next/link";
import { FaUser, FaRegNewspaper ,FaAddressCard } from "react-icons/fa";

function SideNav() {
  return (
    <nav className="shadow-lg p-10 rounded-lg bg-white">
      <ul>
        <li>
          <Link className="flex items-center my-3 p-3 rounded-lg" href="/admin">
          <FaAddressCard className="mr-2"></FaAddressCard> Dashbaord 
          </Link>
        </li>

        <li>
          <Link
            className="flex items-center my-3 p-3 rounded-lg"
            href="/admin/users"
          >
            <FaUser className="mr-2"></FaUser>Users
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center my-3 p-3 rounded-lg"
            href="/admin/posts"
          >
            <FaRegNewspaper className="mr-2"></FaRegNewspaper>Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideNav;
