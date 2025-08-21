const { prisma, Primsa } = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new Error("EmailInUse");
  }

  const newUser = await prisma.$transaction(async (tx) => {
    const counter = await tx.counter.update({
      where: { name: "userCounter" },
      data: { value: { increment: 1 } },
    });
    const userCode = `TDF-${counter.value.toString().padStart(6, "0")}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const createUser = await tx.user.create({
      data: {
        userCode: userCode,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
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
    return createUser;
  });
  return newUser;
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("InvalidCredentials");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("InvalidCredentials");
  }
  const token = jwt.sign(
    {
      userId: user.id,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

module.exports = {
  register,
  login,
};
