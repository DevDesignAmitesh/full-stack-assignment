import { Request, Response } from "express";
import { generateTokem, responsePlate } from "../../utils";
import { signupSchema, zodErrorMessage } from "@repo/types/types";
import { db, eq, schema, and } from "@repo/db/db";
import { hash } from "bcryptjs";

export const signupRequest = async (req: Request, res: Response) => {
  try {
    const { data, error, success } = signupSchema.safeParse(req.body);

    if (!success) {
      return responsePlate({
        res,
        message: zodErrorMessage({ error }),
        status: 411,
      });
    }

    const { email, number, name, password } = data;

    const existingUser = await db.query.users.findFirst({
      where: and(
        eq(schema.users.number, number),
        eq(schema.users.email, email)
      ),
    });

    if (existingUser) {
      return responsePlate({
        res,
        message: "user already exists with this email or phone",
        status: 400,
      });
    }

    const hashsedPassword = await hash(password, 4);

    await db
      .insert(schema.users)
      .values({
        email,
        number,
        name,
        password: hashsedPassword,
      })
      .then(() => {
        return responsePlate({
          res,
          message: "signup successfull",
          status: 201,
        });
      })
      .catch((e) => {
        console.log("database error ", e);
        return responsePlate({
          res,
          message: "internal server error",
          status: 500,
        });
      });
  } catch (e) {
    console.log("error in signup request ", e);
    return responsePlate({
      res,
      message: "internal server error",
      status: 500,
    });
  }
};
