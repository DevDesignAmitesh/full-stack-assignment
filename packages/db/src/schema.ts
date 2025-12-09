import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const orderStatusEnums = pgEnum("order_status", [
  "PENDING",
  "CONFIRMED",
  "DELIVERED",
  "REJECTED",
]);

export const paymentStatusEnums = pgEnum("payment_status", [
  "PENDING",
  "CONFIRMED",
  "FAILED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  number: text("number").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const deals = pgTable("deals", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  imgUrl: text("imgUrl").notNull(),
  isAcive: boolean("isAcive").notNull(),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  productName: text("productName").notNull(),
  imgUrl: text("imgUrl").notNull(),
  quantity: text("quantity").notNull(),
  status: orderStatusEnums("order_status").notNull(),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const payments = pgTable("payments", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  amount: text("amount").notNull(),
  status: paymentStatusEnums("payment_status").notNull(),
  description: text("description").notNull(),
  imgUrl: text("imgUrl").notNull(),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});
