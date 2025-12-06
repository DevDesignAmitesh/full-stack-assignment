import { Router } from "express";
import { middleware } from "../middleware";
import { talkRequest } from "../services/chat/talk";

export const chatRouter = Router();

chatRouter.post("/talk", middleware, talkRequest)