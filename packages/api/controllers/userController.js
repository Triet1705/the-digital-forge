const { Prisma } = require("@prisma/client");
const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        userCode: true,
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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        roles: true,
        createdAt: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details: ", error);
    res.status(500).json({ error: "Failed to retrive user details." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, roles } = req.body;

    if (roles) {
      const validRoles = Object.values(Prisma.Role);
      if (
        !Array.isArray(roles) ||
        !roles.every((role) => validRoles.includes(roles))
      ) {
        return res.status(400).json({ error: "Invalid roles provided." });
      }
    }
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { firstName, lastName, email, roles },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        roles: true,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user: ", error);
    res.status(500).json({ error: "Failed to update user." });
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword < 6) {
      return res
        .status(400)
        .json({ error: "New password must be at least 6 characters long." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: id },
      data: { password: hashedPassword },
    });

    res
      .status(200)
      .json({ message: "User password has been reset successfully." });
  } catch (error) {
    console.error("Error reset user password: ", error);
    res.status(500).json({ error: "Failed to reset user password." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.userId === id) {
      return res.status(400).json({
        error: "Action forbidden: Admin cannot delete their own account!",
      });
    }
    await prisma.user.delete({ where: { id: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, roles } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const newUser = await prisma.$transaction(async (tx) => {
      const counter = await tx.counter.update({
        where: { name: "userCounter" },
        data: { value: { increment: 1 } },
      });

      const userCode = `TDF-${counter.value.toString().padStart(6, "0")}`;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = await tx.user.create({
        data: {
          userCode: userCode,
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          userCode: true,
          firstName: true,
          lastName: true,
          email: true,
          roles: true,
        },
      });

      return createdUser;
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user by admin:", error);
    res.status(500).json({ error: "Failed to create user." });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetUserPassword,
  createUser,
};
