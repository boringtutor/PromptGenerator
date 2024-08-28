export type ButtonStatus = "pending" | "success" | "error" | "idle";
export type PromptResponse = {
  status: "success" | "error";
  response: string;
  prompt: string | null;
};
