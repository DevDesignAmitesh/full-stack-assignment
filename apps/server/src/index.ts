import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { paymentsRouter } from "./routes/payments.js";
import { orderRouter } from "./routes/order.js";
import { dealsRouter } from "./routes/deals.js";

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
app.use("api/v1/order", orderRouter);
app.use("api/v1/payments", paymentsRouter);
app.use("api/v1/deals", dealsRouter);
