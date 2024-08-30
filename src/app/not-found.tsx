"use client";
import Background from "@/components/background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <Background />
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        404 - Page Not Found
      </h1>
      <p className="text-xl mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <div className="pointer-events-auto">
        <Link
          href="/"
          className="text-lg text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 transition-colors duration-300 py-2 px-4 rounded"
        >
          Return Home
        </Link>
      </div>
      <Link
        onClick={(e) => {
          e.preventDefault();
          console.log("Link clicked");
          // You can add router.push('/') here if needed
        }}
        href="/"
        className="text-lg text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 transition-colors duration-300 py-2 px-4 rounded"
      >
        Return Home
      </Link>
    </div>
  );
}
