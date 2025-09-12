const { prisma } = require("../lib/prisma");

const getAll = async () => {
  return await prisma.car.findMany({
    select: {
      id: true,
      sku: true,
      name: true,
      imageSet: true,
      fuelType: true,
      category: true,
      versions: {
        select: {
          sku: true,
          name: true,
          bodyType: true,
          seats: true,
          descriptionTitle: true,
          baseSpecs: true,
          showcaseImages: true,
        },
      },
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
      baseSpecs: true,
      specs: true,
      showcaseImages: true,
    },
  });
};

module.exports = {
  getAll,
  getVersionsByCarSku,
};
