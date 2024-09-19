import { z } from "zod";

export const SigninFormSchema = z.object({
  email: z.string().email(),
});

export const SigninFormSchemaWithOTP = SigninFormSchema.extend({
  otp: z.string().min(6, {
    message: "Please enter valid a OTP",
  }),
});

export const ResetPasswordSchema = z.object({
  newPassword: z.string(),
});

// const ROLES = ["employee", "company"] as const;
export const SignupFormSchema = z.object({
  email: z.string().email(),
  // role: z.string(),
  // role: z.enum(ROLES),
});
