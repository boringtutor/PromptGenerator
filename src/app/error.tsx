"use client";

import { useEffect } from "react";
import React from "react";
import { Button } from "../components/ui/button";
import Background from "@/components/background";
import { ArrowRight } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleReset = () => {
    reset();
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <Background />
      <div className="z-10 relative">
        <h1 className="flex justify-center w-full text-4xl sm:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Something went wrong!
        </h1>
        <p className="flex justify-center text-xl mb-8">
          An unexpected error has occurred.
        </p>
        <div className="space-y-4 flex justify-center">
          <Button
            onClick={handleReset}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Try Again <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
