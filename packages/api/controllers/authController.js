const authService = require("../services/auth.service");
const { Prisma } = require("@prisma/client");

const register = async (req, res) => {
  try {
    const newUser = await authService.register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === "EmailInUse") {
      return res.status(409).json({ error: "Email already in use." });
    }
    console.error("Error during registration: ", error);
    res.status(500).json({ error: "User registration failed." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    if (error.message === "InvalidCredentials") {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    console.error("Error during login: ", error);
    res.status(500).json({ error: "Failed to Login." });
  }
};

const getRoleOptions = (req, res) => {
  const roles = Object.values(Prisma.Role);
  res.status(200).json(roles);
};

module.exports = {
  register,
  login,
  getRoleOptions,
};
