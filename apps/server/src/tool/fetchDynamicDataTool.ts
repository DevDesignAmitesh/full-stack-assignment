import { tool } from "@langchain/core/tools";
import { dynamicDataSchema } from "@repo/types/types";
import { db, eq, schema } from "@repo/db/db";

export const fetchDynamicDataTool = tool(
  async (input: unknown) => {
    try {
      console.log("fetch order tool called", input);
      const { data, success, error } = dynamicDataSchema.safeParse(input);

      if (!success) {
        return {
          type: "invalid_inputs",
        };
      }

      const { type, orderId } = data;

      if (type === "deals") {
        const deals = await db.query.deals.findMany({
          where: eq(schema.deals.isAcive, true),
        });

        if (deals.length === 0) {
          return {
            message: "data_not_found",
          }
        }

        return {
          type: "data_found",
          data: deals,
        }

      } else if (type === "orders") {
        const orders = await db.query.orders.findMany();

        if (orders.length === 0) {
          return {
            message: "data_not_found",
          }
        }

        return {
          type: "data_found",
          data: orders
        };
      } else if (type === "payments") {
        if (!orderId) {
          return {
            type: "orderId_not_found"
          }
        }

        const payments = await db.query.payments.findMany({
          where: eq(schema.payments.orderId, orderId),
        });

        if (payments.length === 0) {
          return {
            message: "data_not_found",
          }
        }

        return {
          type: "data_found",
          data: payments
        };
      }
    } catch (e) {
      console.log("error in fetchDynamicDataTool ", e);
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
