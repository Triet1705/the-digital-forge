const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    firstName: z
      .string({ require_error: "First name is required" })
      .min(1, "First name is required"),
    lastName: z
      .string({ require_error: "Last name is required" })
      .min(1, "Last name is required"),
    email: z
      .string({ require_error: "Email is required" })
      .email("Invalid email format"),
    password: z
      .string({ require_error: "Password is require" })
      .min(6, "Password must be as least 6 characters long"),
  }),
});

const loginSchema = z.object({
  body: z.object({
    identifier: z.union(
      [
        z.string().email("Invalid email format."),
        z.string().regex(/^TDF-\d{6}$/, "Invalid User Code format."),
      ],
      {
        errorMap: () => ({
          message:
            "Identifier must be a valid email or User Code (e.g., TDF-000001).",
        }),
      }
    ),

    password: z.string().min(1, "Password is required"),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
