import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth";
import { getDataRouter } from "./routes/data";
import { chatRouter } from "./routes/chat";

export const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin"],
  })
);

app.use("api/v1/auth", authRouter);
app.use("api/v1/chat", chatRouter);
app.use("api/v1/data", getDataRouter);
