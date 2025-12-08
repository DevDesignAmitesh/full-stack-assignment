import express, { Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { chatRouter } from "./routes/chat";
import { FRONTEND_URL, PORT } from "./utils";

export const app = express();

app.use(cookieParser());

console.log(FRONTEND_URL);

app.use(
  cors({
    origin: [FRONTEND_URL],

    // for docker
    // origin: ["http://client:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin"],
  })
);

app.use(express.json());

app.use("/api/v1/chat", chatRouter);

app.get("/health", (_, res: Response) => {
  res.send("good");
});

app.listen(PORT, () => {
  console.log("server is running at", PORT);
});
