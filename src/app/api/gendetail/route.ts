import { generateDetailPromptFromOpenAi } from "../utils/misc";

export async function POST(req: Request) {
  try {
    const { topic, example, context } = await req.json();
    let detail = await generateDetailPromptFromOpenAi(topic, example, context);
    detail = JSON.stringify(detail);
    return new Response(detail, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in generateDetailFromOpenAi:", error);
    return new Response("Error generating detail. Please try again later.", {
      status: 500,
    });
  }
}
