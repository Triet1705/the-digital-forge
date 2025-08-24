const { z } = require("zod");

const versionIdSchema = z.object({
  params: z.object({
    versionId: z.string().cuid({ message: "Invalid ID format." }),
  }),
});

const versionSkuSchema = z.object({
  params: z.object({
    sku: z.string().regex(/^V\w+-\w+-\w+/, "Invalid Version SKU format."),
  }),
});

module.exports = {
  versionIdSchema,
  versionSkuSchema,
};
