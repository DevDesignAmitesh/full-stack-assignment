import type { Request, Response } from "express";
import { chatSchema, paramsType } from "@repo/types/types";
import { createCompletion } from "../../utils";
import { parseBotResponse, responsePlate } from "../../utils";

export const talkRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
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

    console.log("data validated");

    const { recentMessage, allMessages } = data;

    // message which will be set in the inmemory and db for the assistant role
    let parsed: {
      relatedTo: paramsType;
      message: string;
    } | null = {
      message: "",
      relatedTo: null,
    };

    try {
      await createCompletion(
        [...allMessages, { message: recentMessage, role: "user" }],
        (chunk) => {
          console.log("data from ai", chunk);
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

    console.log("sending the message", parsed);
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
