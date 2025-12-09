import { Request, Response } from "express";
import { generateTokem, responsePlate } from "../../utils";
import { signinSchema, zodErrorMessage } from "@repo/types/types";
import { db, eq, schema } from "@repo/db/db";
import { compare } from "bcryptjs"

export const signinRequest = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = signinSchema.safeParse(req.body);

    if (!success) {
      return responsePlate({
        res,
        message: zodErrorMessage({ error }),
        status: 411,
      });
    }

    const { email, password } = data;

    const exisitngUser = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (!exisitngUser) {
      return responsePlate({
        res,
        message: "user not found",
        status: 404,
      });
    }

    const isPasswordValid = await compare(password, exisitngUser.password);
    
    if(!isPasswordValid) {
      return responsePlate({
        res,
        message: "password is wrong",
        status: 400
      })
    }

    const token = generateTokem({ userId: exisitngUser.id });

    return responsePlate({
      res,
      message: "signin successfull",
      data: {
        token,
      },
      status: 200,
    });
  } catch (e) {
    console.log("error in signinRequest ", e);
    return responsePlate({
      res,
      message: "internal server error",
      status: 500,
    });
  }
};
