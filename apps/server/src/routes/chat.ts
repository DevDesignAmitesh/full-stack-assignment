import { Router } from "express";
import { talkRequest } from "../services/chat/talk";
import { middleware } from "../middleware";

export const chatRouter = Router();

chatRouter.post("/talk", middleware, talkRequest);
