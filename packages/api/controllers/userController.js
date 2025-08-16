const { PrismaClient } = require("@prisma/client");
const { get } = require("../routes/carRoutes");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        roles: true,
        provider: true,
        createdAt: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};

module.exports = {
  getAllUsers,
};
