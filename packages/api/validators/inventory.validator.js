const { z } = require("zod");

const inventoryIdSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid Inventory ID format"),
  }),
});

const createInventorySchema = z.object({
  body: z.object({
    versionId: z.string().cuid("Invalid Version ID"),
    showroomId: z.string().cuid("Invalid Showroom ID"),
    quantity: z.number().int().min(0),
  }),
});

const updateInventorySchema = z.object({
  body: z.object({
    quantity: z.number().int().min(0),
  }),
});

const checkInventorySchema = z.object({
  body: z.object({
    versionId: z.string().cuid("Invalid Version ID"),
  }),
});

module.exports = {
  inventoryIdSchema,
  createInventorySchema,
  updateInventorySchema,
  checkInventorySchema,
};
