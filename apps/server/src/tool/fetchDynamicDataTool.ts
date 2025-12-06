import { tool } from "@langchain/core/tools";
import { dynamicDataSchema } from "@repo/types/types";
import axios from "axios";
import { HTTP_URL } from "../utils";

export const fetchDynamicDataTool = tool(
  async (input: unknown) => {
    try {
      const { data, success, error } = dynamicDataSchema.safeParse(input);

      if (!success) {
        return {
          type: "invalid_inputs",
          message: error,
        };
      }

      const { type, orderId } = data;

      const res = await axios.get(
        `${HTTP_URL}/data/fetch-data?type=${type}&orderId=${orderId}`,
        { validateStatus: () => true }
      );

      if (res.status === 200) {
        return {
          type: "data_found",
          message: res?.data?.message,
          data: res?.data?.data,
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
          type: "invalid_params",
          message: res?.data?.message,
        };
      }
    } catch (e) {
      console.log("error in identifyAndCreateUserTool ", e);
    }
  },
  {
    name: "fetchDynamicDataTool",
    description: `
    Use this tool to fetch data requested by the user after they are authenticated.

    This tool supports ONLY the following data types:
    - "deals": fetch all active product deals
    - "orders": fetch the logged-in user's order history
    - "payments": fetch payment status for a specific order

    Input parameters:
    - type: one of "deals", "orders", "payments"
    - orderId: REQUIRED only when type is "payments"

    Expected behavior:
    - For "deals": returns a list of active deals with images and prices
    - For "orders": returns all orders belonging to the current user
    - For "payments": returns payment details for the given orderId

    Possible outcomes:
    - data_found: data successfully fetched
    - invalid_inputs: schema validation failed
    - invalid_params: unsupported or missing parameters
    - internal_server_error: backend failure

    Do NOT use this tool for:
    - user registration or identification
    - casual chat or greetings
    `,
    schema: dynamicDataSchema,
  }
);
