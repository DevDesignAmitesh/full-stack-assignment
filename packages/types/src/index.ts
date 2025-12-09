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
export type paramsType = "orders" | "payments" | "deals" | null;

export interface FrontendMessage {
  id: string;
  text: string;
  sender: chatRole;
  timestamp: Date;
  relatedTo?: paramsType
}

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
  quantity: string
  createdAt: Date;
}

export type PaymentStatus = "PENDING" | "CONFIRMED" | "FAILED";

export interface Payment {
  id: string;
  amount: string;
  status: PaymentStatus;
  imgUrl: string;
  description: string;

  createdAt: Date;
}

export const signupSchema = z.object({
  name: z.string().min(4),
  email: z.email().min(4),
  password: z.string().min(4),
  number: z.string().min(4),
});

export type UserSignup = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.email().min(4),
  password: z.string().min(4),
});

export type UserSignin = z.infer<typeof signinSchema>;
