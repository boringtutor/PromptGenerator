import OpenAI from "openai";

export const myOpenAI = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
  apiKey: process.env.OPENAI_API,
});
