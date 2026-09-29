import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+\d\s()-]*$/, "Please enter a valid phone number."),
  subject: z.string().trim().min(3, "Please enter a subject.").max(150),
  message: z.string().trim().min(10, "Please add a few more details.").max(2000),
  consent: z.literal("on", { error: "Please confirm that you have read the privacy notice." }),
});

export type ContactFieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export type ContactValues = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
};

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactFieldErrors;
  /** Echoed back on error so the form can keep what the visitor typed. */
  values?: ContactValues;
};
