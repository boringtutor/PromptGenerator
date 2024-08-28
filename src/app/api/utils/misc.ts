import { myOpenAI } from "./helper";

export async function generateExampleFromOpenAi(
  input_topic: string
): Promise<string | null> {
  try {
    const result = await myOpenAI.chat.completions.create({
      model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in generating clear, concise, and relevant examples for any given topic. Your examples should be informative, easy to understand, and tailored to illuminate key aspects of the topic. Provide your response in JSON format.",
        },
        {
          role: "user",
          content: `Generate a comprehensive and illustrative example for the topic: "${input_topic}".

        Your example should:
        1. Be directly relevant to the given topic
        2. Showcase practical application or real-world scenario
        3. Highlight key concepts or principles related to the topic
        4. Be easy to understand for someone new to the subject
        5. Be detailed enough to provide meaningful insight
        6. If applicable, include any potential variations or alternative scenarios

        Please ensure your example is clear, concise, and effectively demonstrates the core ideas of the topic. Provide your response in JSON format with a key called 'example'.`,
        },
      ],
      temperature: 0.4,
      max_tokens: 2000,
    });

    const content = JSON.parse(result.choices[0].message.content || "{}");
    return content.example || null;
  } catch (error) {
    console.error("Error in generateExampleFromOpenAi:", error);
    throw new Error("Error generating example. Please try again later.");
  }
}

export async function generateContextFromOpenAi(
  input_topic: string
): Promise<string | null> {
  try {
    const result = await myOpenAI.chat.completions.create({
      model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content:
            "You are an expert assistant specialized in providing comprehensive and relevant context for various topics. Your task is to generate insightful, well-structured, and informative context that enhances understanding of the given subject.",
        },
        {
          role: "user",
          content: `Please generate a detailed and relevant context for the following topic: "${input_topic}".

          Your response should:
          1. Provide a brief overview or background of the topic.
          2. Highlight key concepts, theories, or principles related to the topic.
          3. Mention any historical significance or recent developments.
          4. Identify potential applications or implications in relevant fields.
          5. Include any controversies, debates, or ongoing research, if applicable.

          Please ensure the context is clear, concise, and tailored to enhance understanding of the topic.`,
        },
      ],
      temperature: 0.4,
      max_tokens: 2500,
    });
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error in generateContextFromOpenAi:", error);
    return "Error generating context. Please try again later.";
  }
}

export async function generateDetailPromptFromOpenAi(
  input_topic: string,
  generated_example: string,
  generated_context: string
): Promise<string | null> {
  try {
    const result = await myOpenAI.chat.completions.create({
      model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content:
            "You are an expert prompt engineer, skilled at creating detailed, nuanced prompts that yield high-quality results. Your task is to generate a comprehensive and effective prompt based on the given topic, example, and context.",
        },
        {
          role: "user",
          content: `Create a detailed and effective prompt for the following:

          Topic: ${input_topic}

          Example: ${generated_example}

          Context: ${generated_context}

          Your prompt should:
          1. Incorporate key elements from the topic, example, and context.
          2. Be specific and clear in its instructions.
          3. Encourage creative and thorough responses.
          4. Include any necessary constraints or guidelines.
          5. Be structured in a way that guides the AI to produce high-quality, relevant output.

          Please provide the prompt in a format ready to be used with an AI model.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });
    return result.choices[0].message.content;
  } catch (error) {
    console.error("Error in generatedetailPromptFromOpenAi:", error);
    return "Error generating detailed prompt. Please try again later.";
  }
}
