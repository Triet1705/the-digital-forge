const showroomService = require("../services/showroom.service");
const {
  showroomSchema,
  updateShowroomSchema,
  showroomIdSchema,
} = require("../validators/showroom.validator");

const createShowroom = async (req, res) => {
  try {
    const { body } = await showroomService.create(body);
    const newShowroom = await showroomService.create(body);
    res.status(201).json(newShowroom);
  } catch (error) {
    if (error instanceof require("zod").ZodError) {
      return res.status(400).json({ error: error.error });
    }
    res.status(500).json({ error: "Failed to create showroom." });
  }
};

const getAllShowroom = async (req, res) => {
  try {
    const showrooms = await showroomService.getAll();
    res.status(200).json(showrooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve showroom." });
  }
};

const getShowroomDetails = async (req, res) => {
  try {
    const { params } = showroomIdSchema.parse(req);
    const showroom = await showroomService.getById(params.id);
  } catch (error) {
    if (error.message === "ShowroomNotFound") {
      return res.status(404).json({ error: "Showroom not found." });
    }
    if (error instanceof require("zod").ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Failed to retrieve showroom." });
  }
};

const updateShowroom = async (req, res) => {
  try {
    const { params } = showroomIdSchema.parse(req);
    const { body } = updateShowroomSchema.parse(req);
    const updateShowroom = await showroomService.update(params.id, body);
    res.status(200).json(updateShowroom);
  } catch (error) {
    if (error.message === "ShowroomNotFound") {
      return res.status(404).json({ error: "Showroom not found." });
    }
    if (error instanceof require("zod").ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Failed to update showroom." });
  }
};

const removeShowroom = async (req, res) => {
  try {
    const { params } = showroomIdSchema.parse(req);
    await showroomService.remove(params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "ShowroomNotFound") {
      return res.status(404).json({ error: "Showroom not found." });
    }
    if (error instanceof require("zod").ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Failed to delete showroom." });
  }
};

module.exports = {
  createShowroom,
  getAllShowroom,
  getShowroomDetails,
  updateShowroom,
  removeShowroom,
};
