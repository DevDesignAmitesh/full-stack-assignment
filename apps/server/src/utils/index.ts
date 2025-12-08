import "dotenv/config";
import { Response } from "express";
import { ChatOpenAI } from "@langchain/openai";
import type { Message, paramsType } from "@repo/types/types";
import { AI_PROMPT } from "../prompt";
import { fetchDynamicDataTool } from "../tool/fetchDynamicDataTool";
import { identifyAndCreateUserTool } from "../tool/identifyAndCreateUserTool";
import {
  ToolMessage,
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";
import type { BaseMessage } from "@langchain/core/messages";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not found");
}

if (!process.env.OPEN_API_KEY) {
  throw new Error("OPEN_API_KEY not found");
}

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV not found");
}

console.log(process.env.NODE_ENV)

export const PORT = 4000;
export const HTTP_URL = `http://localhost:${PORT}/api/v1`;
export const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000`
    : "https://full-stack-assignment-client.vercel.app";

export const responsePlate = ({
  res,
  message,
  status,
  data,
}: {
  res: Response;
  message: string;
  status: number;
  data?: any;
}) => {
  return res.status(status).json({ message, data });
};

export function parseBotResponse(rawString: string): {
  relatedTo: paramsType;
  message: string;
} | null {
  if (!rawString || typeof rawString !== "string") return null;

  try {
    let cleaned = rawString.trim();

    // Remove markdown fences
    cleaned = cleaned
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    /**
     * ✅ CRITICAL FIX:
     * If the string contains escaped newlines or quotes,
     * it means JSON was stringified once already.
     * So we must parse it ONCE to get real JSON text.
     */
    if (cleaned.includes('\\"') || cleaned.includes("\\n")) {
      cleaned = JSON.parse(`"${cleaned.replace(/"/g, '\\"')}"`);
    }

    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) return null;

    const sliced = cleaned.slice(jsonStart, jsonEnd + 1);

    const parsed = JSON.parse(sliced);

    if (
      (typeof parsed.relatedTo === "string" || parsed.relatedTo === null) &&
      typeof parsed.message === "string"
    ) {
      return parsed;
    }

    return null;
  } catch (err) {
    console.error("parseBotResponse error:", err);
    return null;
  }
}

const toolMap = {
  identifyAndCreateUserTool,
  fetchDynamicDataTool,
};

export const createCompletion = async (messages: Message[]) => {
  const model = new ChatOpenAI({
    model: "gpt-4.1",
    temperature: 0.2,
    apiKey: process.env.OPEN_API_KEY,
  });

  const modelWithTools = model.bindTools([
    identifyAndCreateUserTool,
    fetchDynamicDataTool,
  ]);

  const langchainMessages: BaseMessage[] = [
    new SystemMessage({ content: AI_PROMPT }),
    ...messages.map((m) =>
      m.role === "assistant"
        ? new AIMessage({ content: m.message })
        : new HumanMessage({ content: m.message })
    ),
  ];

  // 1️⃣ First call
  const result = await modelWithTools.invoke(langchainMessages);

  // ✅ Case 1: tool call present
  if (result.tool_calls?.length) {
    // ✅ VERY IMPORTANT: push THE SAME assistant message
    langchainMessages.push(result);

    const toolCall = result.tool_calls[0];
    const tool = toolMap[toolCall?.name as keyof typeof toolMap];
    const toolResult = await (tool as any).invoke(toolCall?.args);

    // ✅ ToolMessage MUST come immediately after the AI tool call
    langchainMessages.push(
      new ToolMessage({
        tool_call_id: toolCall?.id!,
        content: JSON.stringify(toolResult),
      })
    );

    // 2️⃣ Final model call
    const finalResult = await modelWithTools.invoke(langchainMessages);
    return finalResult.content;
  }

  // ✅ Case 2: no tool call → normal text response
  if (typeof result.content === "string") {
    return result.content;
  }

  return null;
};
