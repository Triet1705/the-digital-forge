const { prisma } = require("../lib/prisma");

const create = async (data) => {
  return await prisma.showroom.create({ data });
};

const getAll = async () => {
  return await prisma.showroom.findMany();
};

const getById = async (id) => {
  const showroom = await prisma.showroom.findUnique({ where: { id } });
  if (!showroom) {
    throw new Error("ShowroomNotFound");
  }
  return showroom;
};

const update = async (id, data) => {
  await getById(id);
  return await prisma.showroom.update({
    where: { id },
    data,
  });
};

const remove = async (id) => {
  await getById(id);
  await prisma.showroom.delete({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
