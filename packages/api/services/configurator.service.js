const { prisma, Prisma } = require("../lib/prisma");

const calculatePrice = async (versionId, selectedOptionIds) => {
  const version = await prisma.version.findUnique({
    where: { id: versionId },
    include: {
      category: true,
    },
  });

  const selectionsByCategory = {};
  for (const option of selectedOptions) {
    if (!selectionsByCategory[option.categoryId]) {
      selectionsByCategory[option.categoryId] = 0;
    }
    selectionsByCategory[option.categoryId]++;

    if (
      option.category.selectionType === "SINGLE" &&
      selectionsByCategory[option.categoryId] > 1
    ) {
      throw new Error(
        `ValidationError: Cannot select multiple options for category '${option.category.name}'.`
      );
    }
  }
  if (!version) {
    throw new Error("VersionNotFound");
  }
  const basePrice = version.basePrice;

  const selectedOptions = await prisma.option.findMany({
    where: { id: { in: selectedOptionIds } },
  });

  const optionsPrice = selectedOptions.reduce((sum, option) => {
    return sum.plus(option.price);
  }, new Prisma.Decimal(0));

  const totalPrice = basePrice.plus(optionsPrice);

  return {
    basePrice: basePrice.toFixed(2),
    optionsPrice: optionsPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

module.exports = {
  calculatePrice,
};
