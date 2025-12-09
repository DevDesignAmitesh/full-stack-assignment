import { Router } from "express";
import { signupRequest } from "../services/auth/signup";
import { signinRequest } from "../services/auth/signin";

export const authRouter = Router();

authRouter.post("/signup", signupRequest);
authRouter.post("/signin", signinRequest);
