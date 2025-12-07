import { tool } from "@langchain/core/tools";
import { createUserSchema } from "@repo/types/types";
import { db, eq, schema } from "@repo/db/db";

export const identifyAndCreateUserTool = tool(
  async (input: unknown) => {
    const parsed = createUserSchema.safeParse(input);

    if (!parsed.success) {
      return {
        status: "invalid_inputs",
        errors: parsed.error.flatten(),
      };
    }

    const { name, number } = parsed.data;

    const existingUser = await db.query.users.findFirst({
      where: eq(schema.users.number, number),
    });

    if (existingUser) {
      return {
        status: "user_already_exists",
        userId: existingUser.id,
        name: existingUser.name,
      };
    }

    const [created] = await db
      .insert(schema.users)
      .values({ name, number })
      .returning({ id: schema.users.id });

    if (!created?.id) {
      return {
        status: "error",
      };
    }

    return {
      status: "user_created",
      userId: created.id,
      name,
    };
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
