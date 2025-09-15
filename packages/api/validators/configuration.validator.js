const { z } = require("zod");

const createConfigurationSchema = z.object({
  body: z.object({
    versionId: z
      .string({ required_error: "Version ID is required" })
      .cuid({ message: "Invalid Version ID format." }),
    optionIds: z
      .array(z.string().cuid({ message: "Invalid Option ID format." }), {
        required_error: "Option IDs must be an array of strings.",
      })
      .min(1, { message: "At least one option must be selected." }),
  }),
});

const getConfigurationByCodeSchema = z.object({
  params: z.object({
    shareableCode: z
      .string()
      .regex(/^C-\d{6}$/, "Invalid Shareable Code format."),
  }),
});

module.exports = {
  createConfigurationSchema,
  getConfigurationByCodeSchema,
};
