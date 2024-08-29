import OpenAI from "openai";

export const myOpenAI = new OpenAI({
  apiKey: process.env.OPENAI_API,
});
