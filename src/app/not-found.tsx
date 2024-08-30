"use client";
import Background from "@/components/background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Link clicked");
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <Background />
      <div className="z-10 relative">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          404 - Page Not Found
        </h1>
        <p className="text-xl mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <div className="space-y-4 flex justify-center">
          <Button
            onClick={handleClick}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Return Home <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
