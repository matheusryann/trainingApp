import OpenAI from "openai";
import fs from "fs";

import {buildDocsSystemPrompt, buildSystemPrompt, buildUserPrompt} from './prompt';

import type { createPlanSchemaType } from "./types";



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
    timeout: 2 * 60 * 1000, // 2 minutes
    logLevel: "debug"
  });
export async function* generatePlan(input: createPlanSchemaType) {
  const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8");
   
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: buildSystemPrompt()
      },
      {
        role: "user",
        content: buildUserPrompt(input)
      },
    ],
    temperature: 0.6, // the bigger the value, the more creative the response
    stream: true,
});


for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if(delta) yield delta;
}

}
