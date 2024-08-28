export type ButtonStatus = "idle" | "loading" | "success" | "error";
export type PromptResponse = {
  status: "success" | "error";
  response: string;
  prompt: string | null;
};
