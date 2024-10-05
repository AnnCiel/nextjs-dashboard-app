import React from "react";
import { FaUser, FaRegNewspaper } from "react-icons/fa";

function Content( {totalUsersData , totalPostsData}) {
  return (
    <div className="px-10 rounded-md">
      <div className="flex">
        <div className="shadow-lg w-[300px] m-3 p-10 rounded-lg">
          <h3 className="flex items-center">
            <FaUser className="mr-2"></FaUser>Total Users
          </h3>
          <p className="text-5xl mt-10">{ totalUsersData?.length}</p>
        </div>
        <div className="shadow-lg w-[300px] m-3 p-10 rounded-lg">
          <h3 className="flex items-center">
            <FaRegNewspaper className="mr-2"></FaRegNewspaper>Total Posts
          </h3>
          <p className="text-5xl mt-10">{totalPostsData?.length}</p>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
        praesentium corrupti similique rerum mollitia accusantium neque numquam
        veniam deleniti inventore aperiam tempora eos amet molestiae eveniet,
        atque, dicta provident vero.
      </p>
    </div>
  );
}

export default Content;
