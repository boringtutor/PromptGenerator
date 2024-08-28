"use server";

import { parseWithZod } from "@conform-to/zod";
import { PromptSchema } from "./schema";
import {
  generateExample,
  generateContext,
  generateDetailedPrompt,
} from "../lib/misc";
export async function generatePromptAction(
  prevState: undefined,
  formData: FormData
) {
  const submission = parseWithZod(formData, { schema: PromptSchema });
  if (submission.status !== "success") {
    console.log("the submission is not successful");
    return submission.reply();
  }

  console.log("The submission is submitted");
  console.log(submission.value);
  const topic = submission.value.prompt;
  let example: unknown = await generateExample(topic);
  let context: unknown = await generateContext(topic);

  example = JSON.stringify(example);
  context = JSON.stringify(context);
  let detail = await generateDetailedPrompt(example, context, topic);
  detail = JSON.stringify(detail);
  return {
    status: "success",
    response: detail,
    prompt: submission.value.prompt,
  };
}

// const MOCK_DETAIL =
//   'Prompt:\n\nYou are an AI model tasked with generating a detailed concept for a meal planner app. The app should help users in planning their meals ahead of time, streamline the process of meal preparation, grocery shopping, and nutrient tracking. It should also be customized according to the user\'s dietary preferences, health goals, and lifestyle. It should provide recipes, generate grocery lists, track calorie intake, and even offer cooking instructions. \n\nYour concept should follow the example given: \n\n{"title":"Meal Planner App: Weekly Family Dinner Planning","description":"Imagine a busy parent who wants to plan healthy and varied dinners for their family for the upcoming week. They also want to generate a shopping list based on these planned meals.","scenario":{"step1":"The parent opens the meal planner app and selects \'New Meal Plan\'.","step2":"They choose \'Dinner\' as the meal type and set the duration to \'1 Week\'.","step3":"They start adding meals to the planner. For Monday, they select \'Grilled Salmon with Quinoa and Broccoli\'. The app shows the ingredients needed for this meal.","step4":"They continue this process for the rest of the week, choosing different meals like \'Chicken Stir Fry\', \'Vegetarian Tacos\', etc.","step5":"Once all the meals are planned, the app generates a comprehensive shopping list, grouping similar items together for convenience."},"key_concepts":{"concept1":"The app allows users to plan meals for specific durations and meal types.","concept2":"The app provides a variety of meal options to ensure a balanced diet.","concept3":"The app can generate a shopping list based on the planned meals."},"variations":{"variation1":"The user could also plan for other meal types like breakfast, lunch, or snacks.","variation2":"The user could set dietary preferences or restrictions, such as vegetarian, gluten-free, dairy-free, etc.","variation3":"The app could also suggest meals based on the user\'s past selections or trending recipes."}}\n\nYou should incorporate the key concepts of meal planning, dietary tracking, personalized nutrition, and digital health. Also, consider the historical significance and recent developments in this field, such as the integration of AI and machine learning algorithms, and the potential controversies and debates surrounding the accuracy and effectiveness of these apps.\n\nYour response should:\n\n1. Provide a detailed description of the app\'s functionality and user interface.\n2. Explain how the app will help users in meal planning, dietary tracking, and personalized nutrition.\n3. Discuss the use of AI and machine learning algorithms in personalizing meal recommendations.\n4. Suggest potential features that can enhance the user experience and effectiveness of the app.\n5. Address potential controversies and debates, and suggest how the app could overcome these challenges.\n6. Discuss how the app could be used by dietitians, nutritionists, schools, hospitals, and other institutions.\n7. Describe how the app complements professional medical advice, rather than replacing it.\n\nEnsure your response is creative, thorough, and presents a comprehensive concept of a meal planner app.';
