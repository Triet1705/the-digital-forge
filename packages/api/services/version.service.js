const { prisma } = require("../lib/prisma");

const getDetailsBySku = async (sku) => {
  const version = await prisma.version.findUnique({
    where: { sku: sku },
    select: {
      id: true,
      sku: true,
      name: true,
      basePrice: true,
      variantGroup: true,
      carId: true,
      specs: true,
      showcaseImages: true,
      descriptionTitle: true,
      description: true,
      galleryImages: true,
      car: {
        select: {
          name: true,
          sku: true,
        },
      },
    },
  });
  if (!version) {
    throw new Error("VersionNotFound");
  }
  return version;
};

const getTechnicalSpecsBySku = async (sku) => {
  const version = await prisma.version.findUnique({
    where: { sku },
    select: {
      detailedSpecs: true,
      technicalDetails: true,
    },
  });
  if (!version) {
    throw new Error("VersionNotFound");
  }
  return version;
};

module.exports = {
  getDetailsBySku,
  getTechnicalSpecsBySku,
};
