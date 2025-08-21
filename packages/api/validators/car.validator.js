const { z } = require("zod");

const carSkuSchema = z.object({
  params: z.object({
    carSku: z
      .string()
      .regex(/^CAR-\w+$/, "Invalid Car SKU format. Expected format: CAR-XXX"),
  }),
});

module.exports = {
  carSkuSchema,
};
