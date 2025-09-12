const optionService = require("../services/option.service");
const {
  createOptionSchema,
  objectIdSchema,
} = require("../validators/option.validator");

const createOption = async (req, res) => {
  try {
    const validationResult = createOptionSchema.shape.body.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.errors });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const newOption = await optionService.create(
      validationResult.data,
      req.file.buffer
    );

    res.status(201).json(newOption);
  } catch (error) {
    console.error("Error creating option: ", error);
    res.status(500).json({ error: "Failed to create option." });
  }
};

const updateOption = async (req, res) => {
  try {
    objectIdSchema.shape.params.parse(req.params);
    updateOptionSchema.shape.body.parse(req.body);

    const updatedOption = await optionService.update(
      req.params.id,
      req.body,
      req.file ? req.file.buffer : null
    );
    res.status(200).json(updatedOption);
  } catch (error) {
    if (error.message === "RecordNotFound") {
      return res
        .status(404)
        .json({ error: `Option with ID '${req.params.id}' not found.` });
    }
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
  }
};

const getAllOptions = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const options = await optionService.getAll(categoryId);
    res.status(200).json(options);
  } catch (error) {
    console.error("Error fetching options: ", error);
    res.status(500).json({ error: "Failed to retrieve options." });
  }
};

const getOptionById = async (req, res) => {
  try {
    objectIdSchema.shape.params.parse(req.params);
    const option = await optionService.getById(req.params.id);
    res.status(200).json(option);
  } catch (error) {
    if (error.message === "RecordNotFound") {
      return res
        .status(404)
        .json({ error: `Option with ID '${req.params.id}' not found.` });
    }
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
  }
};

const deleteOption = async (req, res) => {
  try {
    objectIdSchema.shape.params.parse(req.params);
    await optionService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "RecordNotFound") {
      return res
        .status(404)
        .json({ error: `Option with ID '${req.params.id}' not found.` });
    }
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
  }
};

module.exports = {
  createOption,
  updateOption,
  getAllOptions,
  getOptionById,
  deleteOption,
};
