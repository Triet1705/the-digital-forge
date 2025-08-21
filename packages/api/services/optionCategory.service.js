const { prisma } = require("../lib/prisma");

const getAll = async () => {
  const categories = await prisma.optionCategory.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return categories;
};

module.exports = {
  getAll,
};
