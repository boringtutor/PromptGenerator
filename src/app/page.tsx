"use client";
import PromptInputForm from "@/components/form";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Wand2,
  Copy,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CopyToClipBoard } from "@/components/ui/copyToClipBoard";
import { showToast } from "@/lib/utils";
import Background from "@/components/background";

export default function Home() {
  const [generatePrompt, setGeneratePrompt] = useState<string | undefined>(
    undefined
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  const [inputPrompt, setInputPrompt] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    showToast({
      title: "Copied to clipboard",
      description: "The generated prompt has been copied to your clipboard.",
    });
  };

  useEffect(() => {
    console.log(generatePrompt);
    if (generatePrompt !== null) {
      showToast();
      document
        .getElementById("custom-generated-prompt")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatePrompt]);

  const handleGetStarted = () => {
    setShowGenerator(true);
    setTimeout(() => {
      console.log(textareaRef.current);
      console.log("bringing text area into focus");
      textareaRef.current?.focus();
    }, 100);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToGenerator = () => {
    const generatorElement = document.getElementById("generator");
    if (generatorElement) {
      generatorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFeedback = (isUseful: boolean) => {
    if (isUseful) {
      showToast({
        title: "Thank you for your feedback!",
        description: `You ${
          isUseful ? "liked" : "disliked"
        } this prompt. We'll use this to improve our generator.`,
      });
    } else {
      // setGeneratePrompt(undefined);
      // setFeedback(null);
      showToast({
        title: "Thank you for your feedback!",
        description: `You ${
          isUseful ? "liked" : "disliked"
        } this prompt. We'll use this to improve our generator.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <Background />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              AI Prompt Generator
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Elevate your AI interactions with expertly crafted prompts. Our
              tool transforms your ideas into detailed,
              <span className="text-2xl mx-2 sm:text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                GPT-4
              </span>
              optimized instructions in seconds.
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Button
            variant="ghost"
            size="lg"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-400 hover:pt-2 hover:bg-opacity-20 transition-all duration-200"
            onClick={scrollToGenerator}
          >
            <ArrowDown className="h-8 w-8 animate-bounce" />
            <span className="sr-only">Scroll down</span>
          </Button>
        </motion.div>

        {!showGenerator && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="py-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">
                  1. Enter Your Idea
                </h3>
                <p className="text-gray-300">
                  Start with a simple concept or question. Our AI will expand on
                  it.
                </p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">
                  2. AI Enhancement
                </h3>
                <p className="text-gray-300">
                  Our advanced AI processes your input, adding depth and
                  structure.
                </p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">
                  3. Optimized Output
                </h3>
                <p className="text-gray-300">
                  Receive a comprehensive, GPT-4 ready prompt to power your
                  projects.
                </p>
              </div>
            </div>
          </motion.section>
        )}
        {showGenerator && (
          <motion.div
            id="generator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16"
          >
            <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400">
                  Generate Your Prompt
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter your initial idea and let AI do the rest.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PromptInputForm
                  setGeneratePrompt={setGeneratePrompt}
                  ref={textareaRef}
                />
              </CardContent>
              {generatePrompt && (
                <CardFooter id="custom-generated-prompt">
                  <motion.div
                    className="mt-4 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-purple-400">
                        Generated Prompt:
                      </h3>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleFeedback(true)}
                          variant="outline"
                          size="sm"
                          className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          <span className="sr-only">Like this prompt</span>
                        </Button>
                        <Button
                          onClick={() => handleFeedback(false)}
                          variant="outline"
                          size="sm"
                          className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                        >
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          <span className="sr-only">Dislike this prompt</span>
                        </Button>
                        <Button
                          onClick={copyToClipboard}
                          variant="outline"
                          size="sm"
                          className="text-gray-400 border-gray-600 hover:bg-gray-700"
                        >
                          <Copy className="h-4 w-4 mr-2" /> Copy
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 backdrop-blur-sm p-4 rounded-md whitespace-pre-wrap text-gray-300 border border-gray-600">
                      {generatePrompt}
                    </div>
                  </motion.div>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8"
          >
            <Button
              variant="secondary"
              size="icon"
              onClick={scrollToTop}
              className="bg-purple-500 hover:bg-purple-600 hover:pt-2 text-white rounded-full shadow-lg"
            >
              <ArrowUp className="h-6 w-6 animate-bounce" />
              <span className="sr-only">Scroll to top</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
