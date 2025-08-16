const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.optionCategory.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching options categories: ", error);
    res.status(500).json({ error: "Failed to retrieve data." });
  }
};

module.exports = {
  getAllCategories,
};
