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
