import { tool } from "@langchain/core/tools";
import { createUserSchema } from "@repo/types/types";
import axios from "axios";
import { HTTP_URL } from "../utils";

export const identifyAndCreateUserTool = tool(
  async (input: unknown) => {
    try {
      const { data, success, error } = createUserSchema.safeParse(input);

      if (!success) {
        return {
          type: "invalid_inputs",
          message: error,
        };
      }

      const { name, number } = data;

      const res = await axios.post(
        `${HTTP_URL}/auth/identify-create-user`,
        {
          name,
          number,
        },
        { validateStatus: () => true }
      );

      if (res.status === 201) {
        return {
          type: "user_created",
          message: res?.data?.message,
        };
      } else if (res.status === 411) {
        return {
          type: "invalid_inputs",
          message: error,
        };
      } else if (res.status === 500) {
        return {
          type: "internal_server_error",
          message: res?.data?.message,
        };
      } else if (res.status === 400) {
        return {
          type: "user_already_exists",
          message: res?.data?.message,
        };
      }
    } catch (e) {
      console.log("error in identifyAndCreateUserTool ", e);
    }
  },
  {
    name: "identifyAndCreateUserTool",
    description: `
    Use this tool ONLY when the user provides their name and phone number
    and wants to register or identify themselves.

    This tool:
    - Validates the user's name and phone number
    - Registers the user if they do NOT already exist
    - Attaches an authenticated session on success

    Input requirements:
    - name: person's full name
    - number: phone number as digits only

    Possible outcomes:
    - user_created: new user was successfully registered
    - user_already_exists: user is already registered
    - invalid_inputs: missing or invalid name/number
    - internal_server_error: backend failure

    Do NOT use this tool for:
    - fetching deals
    - orders or payments
    - casual conversation
    `,
    schema: createUserSchema,
  }
);
