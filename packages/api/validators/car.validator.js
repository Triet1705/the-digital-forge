const { z } = require("zod");

const carIdSchema = z.object({
  params: z.object({
    carId: z.string().min(1, "Car ID is required"),
  }),
});

module.exports = {
  carIdSchema,
};
