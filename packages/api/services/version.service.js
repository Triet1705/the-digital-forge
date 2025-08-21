const { prisma } = require("../lib/prisma");

const getDetailsById = async (id) => {
  const version = await prisma.version.findUnique({
    where: { id },
    select: {
      id: true,
      sku: true,
      name: true,
      basePrice: true,
      variantGroup: true,
      carId: true,
      specs: true,
      showcaseImages: true,
      description: true,
      galleryImages: true,
    },
  });
  if (!version) {
    throw new Error("VersionNotFound");
  }
  return version;
};

const getTechnicalSpecsById = async (id) => {
  const version = await prisma.version.findUnique({
    where: { id },
    select: {
      detailedSpecs: true,
      technicalDetails: true,
    },
  });
};

module.exports = {
  getDetailsById,
  getTechnicalSpecsById,
};
