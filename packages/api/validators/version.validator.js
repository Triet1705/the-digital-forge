const { z } = require("zod");

const versionIdSchema = z.object({
  params: z.object({
    versionId: z.string().cuid({ message: "Invalid ID format." }),
  }),
});

module.exports = {
  versionIdSchema,
};
