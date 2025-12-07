import "dotenv/config";
import { Response } from "express";
// import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import type { Message, paramsType } from "@repo/types/types";
import { AI_PROMPT } from "../prompt";
import { fetchDynamicDataTool } from "../tool/fetchDynamicDataTool";
import { identifyAndCreateUserTool } from "../tool/identifyAndCreateUserTool";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not found");
}

if (!process.env.GEMINI_API_KEY) {
  throw new Error("process.env.GEMINI_API_KEY not found");
}

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

export const createCompletion = async (
  messages: Message[],
  cb: (chunk: string) => void
) => {
  // const model = new ChatOpenAI({
  //   model: "gpt-4.1",
  //   temperature: 1,
  //   apiKey: "",
  // });

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 1,
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const agent = createReactAgent({
    llm: model,
    tools: [fetchDynamicDataTool, identifyAndCreateUserTool],
  });

  const langchainMessages = [
    { role: "system", content: AI_PROMPT },
    ...messages.map((m) => ({
      role: m.role,
      content: m.message,
    })),
  ];

  const result = await agent.invoke({ messages: langchainMessages });

  console.log("result from ai", result.messages[2]?.content);

  // // 🔍 Extract the last AI message

  // const aiMessage = [result.messages[2]]
  //   .reverse()
  //   .find((m) => m instanceof AIMessage);

  // if (aiMessage?.content) {
  //   const content =
  //     typeof aiMessage.content === "string"
  //       ? aiMessage.content
  //       : JSON.stringify(aiMessage.content);

  // }
  console.log(typeof result.messages[2]?.content);
  cb(result.messages[2]?.content as string);
};

export const PORT = 4000;
export const HTTP_URL = `https://locolhost:${PORT}/api/v1`;
