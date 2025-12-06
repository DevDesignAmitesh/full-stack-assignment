import { envSchema } from "@repo/backend-utils/backend-utils";

const { data, success, error } = envSchema.safeParse(process.env);

if (!success) {
  console.info("Missing or invalid environment variables");
  console.error(error.issues.map((issue) => issue.path).join("\n"));
  process.exit(1);
}

export const env = data;
