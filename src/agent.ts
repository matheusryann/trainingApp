import OpenAI from "openai";

import {buildDocsSystemPrompt, buildSystemPrompt, buildUserPrompt} from './prompt';

import type { createPlanSchemaType } from "./types";


export async function generatePlan(input: createPlanSchemaType) {
  console.log(input)

  return input;
}
