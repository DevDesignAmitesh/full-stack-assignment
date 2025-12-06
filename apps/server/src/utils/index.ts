import { Response } from "express";
import { sign, verify } from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET not found");
}

export const responsePlate = ({
  res,
  message,
  status,
  data,
}: {
  res: Response;
  message: string;
  status: number;
  data?: any;
}) => {
  return res.status(status).json({ message, data });
};

export const generateToken = ({
  userId,
}: {
  userId: string;
}): string | null => {
  try {
    const token = sign({ userId }, process.env.JWT_SECRET!);
    return token;
  } catch (e) {
    console.log("error in generateToken ", e);
    return null;
  }
};

export const verifyToken = ({ token }: { token: string }): string | null => {
  try {
    const res = verify(token, process.env.JWT_SECRET!) as { userId: string };
    if (res.userId) return res.userId;
    return null;
  } catch (e) {
    console.log("error in generateToken ", e);
    return null;
  }
};
