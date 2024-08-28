import { generateExampleFromOpenAi } from "../utils/misc";

export async function POST(req: Request) {
  try {
    console.log("Generating example");
    const { topic } = await req.json();
    console.log("Topic:", topic);
    const example = await generateExampleFromOpenAi(topic);
    // const example = MOCK_RESULT;
    // console.warn("Example:", example);
    return new Response(JSON.stringify(example), {
      // Convert object to JSON string
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

export const MOCK_RESULT = {
  scenario:
    "A software development company is about to release a new application. Before the release, they need to test the prompt, a feature that asks users for their input.",
  steps: [
    {
      step: "Identify the expected behavior of the prompt",
      description:
        "The team defines that the prompt should appear when users click a specific button, and it should request them to enter their email address.",
    },
    {
      step: "Create test cases",
      description:
        "The team creates various test cases, including valid email addresses, invalid email addresses, and empty input to see how the prompt responds.",
    },
    {
      step: "Execute the test cases",
      description:
        "The team uses a testing framework to automate the process of entering the test cases and recording the prompt's responses.",
    },
    {
      step: "Analyze the results",
      description:
        "The team checks if the prompt behaved as expected for each test case. For example, it should accept valid email addresses, reject invalid ones, and ask again if the input is empty.",
    },
    {
      step: "Make necessary changes",
      description:
        "If the prompt did not behave as expected in any of the test cases, the team modifies the code and repeats the testing process until the prompt works correctly.",
    },
  ],
  variations: [
    {
      variation: "Manual testing",
      description:
        "Instead of using a testing framework, the team could manually enter the test cases and observe the prompt's responses.",
    },
    {
      variation: "User testing",
      description:
        "The team could give a beta version of the application to a group of users and ask them to use the feature with the prompt, collecting feedback about its functionality and usability.",
    },
  ],
  key_concepts: [
    {
      concept: "Expected behavior",
      description:
        "This is what the team defines as the correct response of the prompt to various inputs.",
    },
    {
      concept: "Test cases",
      description:
        "These are different inputs that the team uses to check if the prompt behaves correctly.",
    },
    {
      concept: "Testing framework",
      description:
        "This is a tool that automates the process of entering the test cases and recording the responses of the prompt.",
    },
  ],
};
