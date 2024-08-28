import { sleep } from "./utils"; // Assuming you have a sleep function in utils

export async function generateExample(topic: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:3000/api/genexample", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });
    const data = await response.json();
    console.log("Response from the server is  :", data);
    return data;
  } catch (error) {
    console.error("Error in generateExample:", error);
    return "Error generating example. Please try again later.";
  }
}

export async function generateContext(topic: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:3000/api/gencontext", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in generateContext:", error);
    return "Error generating context. Please try again later.";
  }
}

export async function generateDetailedPrompt(
  example: unknown,
  context: unknown,
  topic: string
): Promise<string> {
  try {
    const response = await fetch("http://localhost:3000/api/gendetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, example, context }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in generateDetailedPrompt:", error);
    return "Error generating detailed prompt. Please try again later.";
  }
}
