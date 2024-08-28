"use server";

import { parseWithZod } from "@conform-to/zod";
import { PromptSchema } from "./schema";
import {
  generateExample,
  generateContext,
  generateDetailedPrompt,
} from "../lib/misc";
import { PromptResponse } from "@/lib/types";

/**
 * Handles the prompt action by parsing form data, generating examples, context, and detailed prompts.
 *
 * @param {unknown} prevState - The previous state (not used in this function).
 * @param {FormData} formData - The form data containing the prompt information.
 * @returns {Promise<PromptResponse>} - A promise that resolves to a PromptResponse object.
 */
export async function promptaction(
  prevState: unknown,
  formData: FormData
): Promise<PromptResponse> {
  // Parse the form data using the provided schema
  const submission = parseWithZod(formData, {
    schema: PromptSchema,
  });

  // Handle validation errors
  if (submission.status !== "success") {
    return {
      status: "error",
      response: JSON.stringify(submission.reply()),
      prompt: null,
    };
  }

  // Extract the prompt topic from the submission
  const topic = submission.value.prompt;

  // Generate example and context based on the topic
  let example: unknown = await generateExample(topic);
  let context: unknown = await generateContext(topic);

  // Convert example and context to JSON strings
  example = JSON.stringify(example);
  context = JSON.stringify(context);

  // Generate a detailed prompt using the example and context
  let detail = await generateDetailedPrompt(example, context, topic);
  detail = JSON.stringify(detail);

  // Return the successful response
  return {
    status: "success",
    response: detail,
    prompt: submission.value.prompt,
  };
}
