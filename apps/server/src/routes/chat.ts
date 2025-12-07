import { Router } from "express";
import { talkRequest } from "../services/chat/talk";

export const chatRouter = Router();

chatRouter.post("/talk", talkRequest);
