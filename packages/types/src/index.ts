import z, { ZodError } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  number: z.string().regex(/^(\+91)?\d{10}$/, "Phone number must be valid."),
});

export const zodErrorMessage = ({ error }: { error: ZodError }) => {
  return error.issues
    .map((er) => `${er.path.join(".")}: ${er.message}`)
    .join(" ");
};

export const chatSchema = z.object({
  allMessages: z.array(
    z.object({ role: z.enum(["user", "assistant"]), message: z.string() })
  ),
  recentMessage: z.string(),
});

export type chatRole = "user" | "assistant";

export interface Message {
  role: chatRole;
  message: string;
}

export interface FrontendMessage {
  id: string;
  text: string;
  sender: chatRole;
  timestamp: Date;
}

export type paramsType = "orders" | "payments" | "deals" | null;

export const dynamicDataSchema = z.object({
  type: z.enum(["orders", "payments", "deals"]),
});

export interface Deal {
  id: string;
  title: string;
  description: string;
  price: string;
  imgUrl: string;
  isActive: boolean;

  createdAt: Date;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "DELIVERED" | "REJECTED";

export interface Order {
  id: string;
  productName: string;
  imgUrl: string;
  status: OrderStatus;

  userId?: string | null;

  createdAt: Date;
}

export type PaymentStatus = "PENDING" | "CONFIRMED" | "FAILED";

export interface Payment {
  id: string;
  amount: string;
  status: PaymentStatus;

  createdAt: Date;
}
