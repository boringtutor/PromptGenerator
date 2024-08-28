"use client";
import PromptInputForm from "@/components/form";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [generatePrompt, setGeneratePrompt] = useState<string | undefined>(
    undefined
  );
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="flex ">
        <PromptInputForm setGeneratePrompt={setGeneratePrompt} />
      </div>

      <Card className="w-[800px] mt-8">
        {generatePrompt ? (
          <>
            <CardHeader>
              <CardTitle>Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: formatPrompt(generatePrompt),
                }}
              />
            </CardContent>
          </>
        ) : (
          <CardHeader>
            <CardTitle>Prompt</CardTitle>
            <CardDescription>
              This is the prompt that was generated
            </CardDescription>
          </CardHeader>
        )}
      </Card>
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
