import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const orderStatusEnums = pgEnum("status", [
  "PENDING",
  "CONFIRMED",
  "DELIVERED",
  "REJECTED",
]);

export const paymentStatusEnums = pgEnum("status", [
  "PENDING",
  "CONFIRMED",
  "FAILED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  number: text("number").notNull().unique(),
  email: text("email"),
  address: text("address"),

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
  status: orderStatusEnums("status").notNull(),

  userId: uuid("userId").references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});

export const payments = pgTable("payments", {
  id: uuid("id").notNull().defaultRandom().primaryKey(),
  amount: text("amount").notNull(),
  status: paymentStatusEnums("status").notNull(),

  orderId: uuid("orderId")
    .references(() => orders.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow(),
});
