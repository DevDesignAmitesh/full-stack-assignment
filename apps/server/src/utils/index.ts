import { Response } from "express";
import { sign, verify } from "jsonwebtoken";
import "dotenv/config";
// import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import type { Message } from "@repo/types/types";
import { AI_PROMPT } from "../prompt";
import { PORT } from "../bin";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not found");
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

export const generateToken = ({
  userId,
}: {
  userId: string;
}): string | null => {
  try {
    const token = sign({ userId }, process.env.JWT_SECRET!);
    return token;
  } catch (e) {
    console.log("error in generateToken ", e);
    return null;
  }
};

export const verifyToken = ({ token }: { token: string }): string | null => {
  try {
    const res = verify(token, process.env.JWT_SECRET!) as { userId: string };
    if (res.userId) return res.userId;
    return null;
  } catch (e) {
    console.log("error in generateToken ", e);
    return null;
  }
};

export const setToken = ({
  res,
  token,
  MINUTES = 60,
}: {
  res: Response;
  token: string;
  MINUTES?: number;
}) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MINUTES * 60 * 1000, // 60 minutes
  });
};

export function parseBotResponse(rawString: string): {
  relatedTo: string;
  message: string;
} | null {
  if (!rawString || typeof rawString !== "string") {
    return null;
  }

  try {
    // In case the stream contains extra characters before/after JSON
    const jsonStart = rawString.indexOf("{");
    const jsonEnd = rawString.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      return null;
    }

    const sliced = rawString.slice(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(sliced);

    // Validate structure
    if (
      typeof parsed.relatedTo === "string" &&
      typeof parsed.message === "string"
    ) {
      return {
        relatedTo: parsed.relatedTo,
        message: parsed.message,
      };
    }

    // If keys missing → ignore / fallback
    return null;
  } catch {
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
    apiKey: process.env.GEMINI_API_KEY || "",
  });

  const agent = createReactAgent({
    llm: model,
    tools: [],
  });

  const langchainMessages = [
    { role: "system", content: AI_PROMPT },
    ...messages.map((m) => ({
      role: m.role,
      content: m.message,
    })),
  ];

  const result = await agent.invoke({ messages: langchainMessages });

  // 🔍 Extract the last AI message
  const aiMessage = result.messages?.findLast(
    (m: any) => m._getType?.() === "ai"
  );

  if (aiMessage?.content) {
    const content =
      typeof aiMessage.content === "string"
        ? aiMessage.content
        : JSON.stringify(aiMessage.content);

    // Stream the AI's message back
    cb(content);
  }
};

export const HTTP_URL = `https://locolhost:${PORT}`;
