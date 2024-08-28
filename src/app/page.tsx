"use client";
import PromptInputForm from "@/components/form";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyToClipBoard } from "@/components/ui/copyToClipBoard";
import { toast } from "@/components/ui/use-toast";
import { showToast } from "@/lib/utils";

export default function Home() {
  const [generatePrompt, setGeneratePrompt] = useState<string | undefined>(
    undefined
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    console.log(generatePrompt);
    if (generatePrompt !== null) {
      showToast();
      document
        .getElementById("custom-generated-prompt")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatePrompt]);

  const handleFeedback = (isUseful: boolean) => {
    if (isUseful) {
      showToast({
        title: "Glad you found it useful!",
        description:
          "We're glad you found the prompt useful. Your feedback helps us improve our service.",
      });
    } else {
      // setGeneratePrompt(undefined);
      // setFeedback(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center w-full relative ">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Elevate Your Ideas with AI-Powered Prompts
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
                Transform simple concepts into detailed, thought-provoking
                prompts. Unleash your creativity and explore new depths in your
                writing and brainstorming.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                className="hover:bg-white hover:text-primary hover:border-primary hover:border-2"
                onClick={() => {
                  document
                    .getElementById("prompt-generator")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  <path d="M20 3v4" />
                  <path d="M22 5h-4" />
                  <path d="M4 17v2" />
                  <path d="M5 18H3" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section id="prompt-generator" className="flex-grow bg-background py-12">
        <Card className="w-full max-w-2xl mx-auto md:min-w-[400px] lg:min-w-[600px] xl:min-w-[800px]">
          <CardHeader>
            <CardTitle>Detailed Prompt Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <PromptInputForm setGeneratePrompt={setGeneratePrompt} />
          </CardContent>
        </Card>
      </section>

      {generatePrompt && (
        <div
          id="custom-generated-prompt"
          className="mt-6 p-4 border rounded-md bg-muted"
        >
          <div className="flex justify-end mb-2">
            <CopyToClipBoard message="Copied to clipboard!" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Generated Detailed Prompt:
          </h3>
          <p
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: formatPrompt(generatePrompt) }}
          >
            {generatePrompt}
          </p>
        </div>
      )}
    </main>
  );
}

function formatPrompt(prompt: string): string {
  return prompt
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>")
    .replace(/(Prompt:)/g, "<strong>$1</strong>")
    .replace(/(Your response should:)/g, "<strong>$1</strong>")
    .replace(/(\d+\.)/g, "<br/><strong>$1</strong>");
}
