import { generateExampleFromOpenAi } from "../utils/misc";

export async function POST(req: Request) {
  try {
    console.log("Generating example");
    const { topic } = await req.json();
    console.log("Topic:", topic);
    const example = await generateExampleFromOpenAi(topic);
    return new Response(JSON.stringify(example), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in generateExampleFromOpenAi:", error);
    return new Response("Error generating example. Please try again later.", {
      status: 500,
    });
  }
}
