CREATE TYPE "public"."order_status" AS ENUM('PENDING', 'CONFIRMED', 'DELIVERED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('PENDING', 'CONFIRMED', 'FAILED');--> statement-breakpoint
CREATE TABLE "deals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" text NOT NULL,
	"imgUrl" text NOT NULL,
	"isAcive" boolean NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"productName" text NOT NULL,
	"imgUrl" text NOT NULL,
	"quantity" text NOT NULL,
	"order_status" "order_status" NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" text NOT NULL,
	"payment_status" "payment_status" NOT NULL,
	"description" text NOT NULL,
	"imgUrl" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"number" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_number_unique" UNIQUE("number"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
