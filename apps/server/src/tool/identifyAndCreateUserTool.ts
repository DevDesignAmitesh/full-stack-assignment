import { tool } from "@langchain/core/tools";
import { createUserSchema } from "@repo/types/types";
import { db, eq, schema } from "@repo/db/db";

export const identifyAndCreateUserTool = tool(
  async (input: unknown) => {
    try {
      console.log("user tool called", input);
      const { data, success, error } = createUserSchema.safeParse(input);

      if (!success) {
        return {
          type: "invalid_inputs",
          error,
        };
      }

      const { name, number } = data;

      const existingUser = await db.query.users.findFirst({
        where: eq(schema.users.number, Number(number)),
      });

      if (existingUser) {
        return {
          type: "user_already_exists",
        };
      }

      await db
        .insert(schema.users)
        .values({
          name,
          number: Number(number),
        })
        .returning({
          id: schema.users.id,
        })
        .then(([data]) => {
          if (!data?.id) {
            return {
              type: "internal_server_error",
            };
          }
          return {
            type: "user_created",
          };
        })
        .catch((e) => {
          console.log("this is the db error", e);
          return {
            type: "internal_server_error",
          };
        });
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
