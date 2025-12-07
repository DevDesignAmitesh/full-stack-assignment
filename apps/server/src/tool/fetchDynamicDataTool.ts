import { tool } from "@langchain/core/tools";
import { dynamicDataSchema } from "@repo/types/types";
import { db, eq, schema } from "@repo/db/db";

export const fetchDynamicDataTool = tool(
  async (input: unknown) => {
    const parsed = dynamicDataSchema.safeParse(input);

    if (!parsed.success) {
      return {
        status: "invalid_inputs",
      };
    }

    const { type } = parsed.data;

    if (type === "deals") {
      const deals = await db.query.deals.findMany({
        where: eq(schema.deals.isAcive, true),
      });

      return {
        status: "ok",
        data: deals,
      };
    }

    if (type === "orders") {
      const orders = await db.query.orders.findMany();
      return {
        status: "ok",
        data: orders,
      };
    }

    if (type === "payments") {
      const payments = await db.query.payments.findMany();

      return {
        status: "ok",
        data: payments,
      };
    }

    return {
      status: "invalid_type",
    };
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
