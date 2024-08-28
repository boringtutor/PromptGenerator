"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import React from "react";
import { Button } from "../components/ui/button";

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-lg mb-8">An unexpected error has occurred.</p>
      <Button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground hover:border-solid hover:border-2 hover:border-primary rounded-md hover:bg-primary-foreground hover:text-primary transition"
      >
        Try again
      </Button>
    </div>
  );
}
