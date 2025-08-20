const optionCategoryService = require("../services/optionCategory.service");

const getAllCategories = async (req, res) => {
  try {
    const categories = await optionCategoryService.getAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching options categories: ", error);
    res.status(500).json({ error: "Failed to retrieve data." });
  }
};

module.exports = {
  getAllCategories,
};
