const { z } = require("zod");
const { Role } = require("@prisma/client");

const createUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must bt at least 6 characters long"),
    roles: z
      .array(z.string().cuid({ message: "Invalid Role ID format." }))
      .optional(),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.string().email().optional(),
    roles: z
      .array(z.string().cuid({ message: "Invalid Role ID format." }))
      .optional(),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
  }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  resetPasswordSchema,
};
