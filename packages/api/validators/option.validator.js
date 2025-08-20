const { z } = require("zod");

const createOptionSchema = z.object({
  body: z.object({
    name: z
      .string({ require_error: "Name is required" })
      .min(3, "Name must be at least 3 characters long."),
    price: z
      .string({ require_error: "Price is required" })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: "Price must be a valid number.",
      }),
    sku: z
      .string({ require_error: "SKU is required" })
      .min(1, "SKU is required."),
    categoryId: z
      .string({ required_error: "Category ID is required" })
      .cuid({ message: "Invalid Category ID format." }),
  }),
});

const updateOptionSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    price: z
      .string()
      .refine((val) => !isNaN(parseFloat(val)))
      .optional(),
    sku: z.string().min(1).optional(),
  }),
});

const objectIdSchema = z.object({
  params: z.object({
    id: z.string().cuid({ message: "Invalid ID format." }),
  }),
});

module.exports = {
  createOptionSchema,
  updateOptionSchema,
  objectIdSchema,
};
