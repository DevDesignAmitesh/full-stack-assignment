import { NextFunction, Request, Response } from "express";
import { responsePlate, verifyTokem } from "../utils";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return responsePlate({
        res,
        message: "un-authorized",
        status: 401,
      });
    }

    const decoded = verifyTokem({ token });

    req.userId = decoded;
    next();
  } catch (e) {
    console.log("error in middleware ", e);

    return responsePlate({
      res,
      message: "un-authorized",
      status: 401,
    });
  }
};
