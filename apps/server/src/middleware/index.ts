import { NextFunction, Request, Response } from "express";
import { responsePlate, verifyToken } from "../utils";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      return responsePlate({
        res,
        message: "token not found",
        status: 401,
      });
    }

    const userId = verifyToken({ token });

    if (!userId) {
      return responsePlate({
        res,
        message: "unale to verify token",
        status: 401,
      });
    }

    req.userId = userId as string;
    next();
  } catch (e) {
    console.log(e);
    return responsePlate({
      res,
      message: "un-authorized",
      status: 401,
    });
  }
};
