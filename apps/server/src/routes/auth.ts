import { Router } from "express";
import { createUserRequest } from "../services/auth/create-user";

export const authRouter = Router();

authRouter.post("/identify-create-user", createUserRequest);
