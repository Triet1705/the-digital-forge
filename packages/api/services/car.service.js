const { prisma } = require("../lib/prisma");

const getAll = async () => {
  return await prisma.car.findMany({
    select: {
      id: true,
      sku: true,
      name: true,
    },
  });
};

const getVersionsByCarId = async (carId) => {
  const car = await prisma.car.findUnique({ where: { id: carId } });
  if (!car) {
    throw new Error("CarNotFound");
  }

  return await prisma.version.findMany({
    where: { carId: carId },
    select: {
      id: true,
      sku: true,
      name: true,
      basePrice: true,
      specs: true,
      showcaseImages: true,
    },
  });
};

module.exports = {
  getAll,
  getVersionsByCarId,
};
