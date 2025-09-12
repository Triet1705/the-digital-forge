const userService = require("../services/user.service");
const {
  createUserSchema,
  updateUserSchema,
  resetPasswordSchema,
} = require("../validators/user.validator");
const { z } = require("zod");
const objectIdSchema = z.string().cuid();

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    objectIdSchema.parse(id);
    const user = await userService.getById(id);

    res.status(200).json(user);
  } catch (error) {
    if (error.message === "UserNotFound") {
      return res
        .status(404)
        .json({ error: `User with ID '${req.params.id}' not found.` });
    }
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Failed to retrive user details." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    updateUserSchema.shape.body.parse(req.body);

    const updatedUser = await userService.update(id, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === "UserNotFound") {
      return res
        .status(404)
        .json({ error: `User with ID '${req.params.id}' not found.` });
    }
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Failed to update user." });
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    resetPasswordSchema.shape.body.parse(req.body);

    await userService.resetPassword(id, req.body.newPassword);
    res
      .status(200)
      .json({ message: "User password has been reset successfully." });
  } catch (error) {
    if (error.message === "UserNotFound") {
      return res
        .status(404)
        .json({ error: `User with ID '${req.params.id}' not found.` });
    }
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
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
    await userService.remove(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "UserNotFound") {
      return res
        .status(404)
        .json({ error: `User with ID '${req.params.id}' not found.` });
    }
    res.status(500).json({ error: "Failed to delete user." });
  }
};

const createUser = async (req, res) => {
  try {
    createUserSchema.shape.body.parse(req.body);
    const newUser = await userService.create(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === "EmailInUse") {
      return res.status(409).json({ error: "Email already in use." });
    }
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
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
