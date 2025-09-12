const inventoryService = require("../services/inventory.service");
const {
  createInventorySchema,
  updateInventorySchema,
  inventoryIdSchema,
  checkInventorySchema,
} = require("../validators/inventory.validator");

const createInventory = async (req, res) => {
  try {
    const { body } = createInventorySchema.parse(req);
    const newInventory = await inventoryService.create(body);
    res.status(201).json(newInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create inventory." });
  }
};

const getAllInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.getAll(req.query);
    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve inventory." });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { params } = inventoryIdSchema.parse(req);
    const { body } = updateInventorySchema.parse(req);
    const updatedInventory = await inventoryService.update(params.id, body);
    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update inventory." });
  }
};

const removeInventory = async (req, res) => {
  try {
    const { params } = inventoryIdSchema.parse(req);
    await inventoryService.remove(params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete inventory." });
  }
};

const checkInventoryForUser = async (req, res) => {
  try {
    const { body } = checkInventorySchema.parse(req);
    const result = await inventoryService.checkInventory(body.versionId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof require("zod").ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Failed to check inventory." });
  }
};

module.exports = {
  createInventory,
  getAllInventory,
  updateInventory,
  removeInventory,
  checkInventoryForUser,
};
