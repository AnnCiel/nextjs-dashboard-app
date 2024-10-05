"use client";
import React from "react";

function DeleteBtn({ id }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure to delete this post?");
    if (confirmed) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalposts?id=${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        window.location.reload(); // Refresh the page on successful deletion
      } catch (error) {
        console.error("Failed to delete the post:", error.message);
        alert("Failed to delete the post. Please try again.");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2"
    >
      Delete
    </button>
  );
}

export default DeleteBtn;
