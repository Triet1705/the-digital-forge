const { prisma, Prisma } = require("../lib/prisma");
const bcrypt = require("bcryptjs");

const create = async (userData) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new Error("EmailInUse");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const counter = await prisma.counter.update({
    where: { name: "userCounter" },
    data: { value: { increment: 1 } },
  });
  const userCode = `TDF-${counter.value.toString().padStart(6, "0")}`;

  const newUser = await prisma.user.create({
    data: {
      userCode,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      ...(userData.roles && {
        roles: {
          connect: userData.roles.map((roleId) => ({ id: roleId })),
        },
      }),
    },
    select: {
      id: true,
      userCode: true,
      firstName: true,
      lastName: true,
      roles: true,
    },
  });
  return newUser;
};

const getAll = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      userCode: true,
      firstName: true,
      lastName: true,
      email: true,
      roles: true,
      provider: true,
      createdAt: true,
    },
  });
};

const getById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      userCode: true,
      firstName: true,
      lastName: true,
      email: true,
      roles: true,
      provider: true,
      createdAt: true,
    },
  });
  if (!user) throw new Error("UserNotFound");
  return user;
};

const update = async (id, userData) => {
  await getById(id);
  return await prisma.user.update({
    where: { id },
    data: userData,
    select: {
      id: true,
      userCode: true,
      firstName: true,
      lastName: true,
      roles: true,
    },
  });
};

const remove = async (id) => {
  await getById(id);
  await prisma.user.delete({ where: { id } });
};

const resetPassword = async (id, newPassword) => {
  await getById(id);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  resetPassword,
};
