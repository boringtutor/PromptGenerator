import { generateContextFromOpenAi } from "../utils/misc";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    let example = await generateContextFromOpenAi(topic);
    example = JSON.stringify(example);
    return new Response(example, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in generateContextFromOpenAi:", error);
    return new Response("Error generating context. Please try again later.", {
      status: 500,
    });
  }
}
