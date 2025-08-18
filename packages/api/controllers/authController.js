const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email already exist." });
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
    console.error("Error during registration: ", error);
    res.status(500).json({ error: "User registration failed." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        roles: user.roles,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json(token);
  } catch (error) {
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
