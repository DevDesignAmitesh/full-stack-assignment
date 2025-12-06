import type { Request, Response } from "express";
import { chatSchema } from "@repo/types/types";
import { db, eq, schema } from "@repo/db/db";
import { createCompletion } from "../../utils";
import { parseBotResponse, responsePlate } from "../../utils";
import { AI_PROMPT } from "../../prompt";

export const talkRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;
    const { success, data, error } = chatSchema.safeParse(req.body);

    if (!success) {
      const errorMessage = error.issues
        .map((er) => `${er.path.join(".")}: ${er.message}`)
        .join(" ");
      return responsePlate({
        res,
        status: 411,
        message: "Invalid inputs",
        data: errorMessage,
      });
    }

    const { recentMessage, allMessages } = data;

    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, userId),
    });

    if (!user) {
      return responsePlate({
        res,
        message: "user not found",
        status: 404,
      });
    }

    // message which will be set in the inmemory and db for the assistant role
    let parsed: {
      relatedTo: string;
      message: string;
    } | null = {
      message: "",
      relatedTo: "",
    };

    try {
      await createCompletion(
        [...allMessages, { message: recentMessage, role: "user" }],
        (chunk) => {
          parsed = parseBotResponse(chunk);
        }
      );
    } catch (error) {
      console.log(error);
      return responsePlate({
        res,
        status: 400,
        message: "unable to get message from AI",
      });
    }

    if (!parsed) {
      return responsePlate({
        res,
        message: "unable to get message from AI",
        status: 400,
      });
    }

    return responsePlate({
      res,
      status: 201,
      message: "OK",
      // ai's message
      data: parsed,
    });
  } catch (error) {
    console.log(error);
    return responsePlate({
      res,
      message: "internal server error",
      status: 500,
    });
  }
};
