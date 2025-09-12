const { z } = require("zod");

const showroomSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    isHeadquarter: z.boolean().optional(),
  }),
});

const updateShowroomSchema = showroomSchema.partial();

const showroomIdSchema = z.object({
  params: z.object({
    id: z.string().cuid("Invalid Showroom ID format"),
  }),
});

module.exports = {
  showroomSchema,
  updateShowroomSchema,
  showroomIdSchema,
};
