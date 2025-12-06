import { Request, Response } from "express";
import { generateToken, responsePlate } from "../../utils";
import { createUserSchema, zodErrorMessage } from "@repo/types/types";
import { db, eq, schema } from "@repo/db/db";

export const createUserRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { data, success, error } = createUserSchema.safeParse(req.body);

    if (!success) {
      return responsePlate({
        res,
        message: "invalid inputs",
        status: 411,
        data: zodErrorMessage({ error }),
      });
    }

    const { name, number } = data;

    const existingUser = await db.query.users.findFirst({
      where: eq(schema.users.number, Number(number)),
    });

    if (existingUser) {
      return responsePlate({
        res,
        message: "user already exists",
        status: 400,
      });
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
          return responsePlate({
            res,
            message: "internal server error",
            status: 500,
          });
        }

        const token = generateToken({ userId: data.id });

        if (!token) {
          return responsePlate({
            res,
            message: "internal server error",
            status: 500,
          });
        }

        return responsePlate({
          res,
          message: "user created successfully",
          status: 201,
          data: { token },
        });
      })
      .catch((e) => {
        console.log("this is the db error", e);
        return responsePlate({
          res,
          message: "internal server error",
          status: 500,
        });
      });
  } catch (e) {
    console.log(e);
    return responsePlate({
      res,
      message: "internal server error",
      status: 500,
    });
  }
};
