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

const getVersionsByCarSku = async (carSku) => {
  const car = await prisma.car.findUnique({ where: { sku: carSku } });
  if (!car) {
    throw new Error("CarNotFound");
  }

  return await prisma.version.findMany({
    where: { carId: car.id },
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
  getVersionsByCarSku,
};
