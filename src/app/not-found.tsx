"use client";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-lg text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 transition-colors duration-300 py-2 px-4 rounded"
      >
        Return Home
      </Link>
    </div>
  );
}
