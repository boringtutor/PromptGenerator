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

  //   Return the successful response
  return {
    status: "success",
    response: detail,
    prompt: submission.value.prompt,
  };
}

const MockPrompt = `
{
  "prompt": "Describe the impact of climate change on polar bears.",
  "details": {
    "context": "Climate change is causing significant changes in the Arctic environment.",
    "example": "For instance, the melting of sea ice is reducing the habitat available for polar bears.",
    "additional_info": {
      "temperature_rise": "The average temperature in the Arctic has risen by 2 degrees Celsius over the past 50 years.",
      "food_scarcity": "Polar bears rely on sea ice to hunt seals, their primary food source, which is becoming scarce.",
      "migration_patterns": "Polar bears are being forced to travel greater distances to find food, leading to increased energy expenditure.",
      "reproduction": "The changing environment is affecting polar bear reproduction rates, with fewer cubs being born and surviving to adulthood.",
      "health_issues": "Polar bears are experiencing more health issues due to malnutrition and increased exposure to pollutants.",
      "human_interaction": "As polar bears move closer to human settlements in search of food, there are more instances of human-wildlife conflict."
    },
    "questions": [
      "How does the loss of sea ice affect polar bear hunting habits?",
      "What are the long-term consequences of climate change on polar bear populations?",
      "How are polar bears adapting to the changing environment?",
      "What role do pollutants play in the health of polar bears?",
      "How can conservation efforts help mitigate the impact of climate change on polar bears?"
    ],
    "case_studies": [
      {
        "region": "Hudson Bay",
        "findings": "Polar bears in Hudson Bay are spending more time on land due to earlier sea ice melt, leading to decreased body condition and lower survival rates."
      },
      {
        "region": "Beaufort Sea",
        "findings": "In the Beaufort Sea, polar bears are experiencing longer fasting periods due to delayed sea ice formation, impacting their overall health and reproduction."
      }
    ],
    "conservation_efforts": [
      {
        "initiative": "Reducing greenhouse gas emissions",
        "description": "Efforts to reduce greenhouse gas emissions aim to slow the rate of climate change and preserve polar bear habitats."
      },
      {
        "initiative": "Protecting critical habitats",
        "description": "Establishing protected areas in the Arctic can help safeguard important habitats for polar bears and other wildlife."
      },
      {
        "initiative": "Research and monitoring",
        "description": "Ongoing research and monitoring of polar bear populations help scientists understand the impacts of climate change and inform conservation strategies."
      }
    ],
    "future_outlook": "The future of polar bears depends on global efforts to address climate change and protect their habitats. Without significant action, polar bears may face severe population declines and potential extinction."
  }
}`;
