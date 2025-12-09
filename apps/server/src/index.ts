import express, { Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { chatRouter } from "./routes/chat";
import { FRONTEND_URL, PORT } from "./utils";
import { authRouter } from "./routes/auth";

export const app = express();

app.use(cookieParser());

console.log(FRONTEND_URL);

app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin"],
  })
);

app.use(express.json());

app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/auth", authRouter);

app.get("/health", (_, res: Response) => {
  res.send("good");
});

app.listen(PORT, () => {
  console.log("server is running at", PORT);
});
