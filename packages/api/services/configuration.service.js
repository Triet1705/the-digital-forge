const { prisma, Prisma } = require("../lib/prisma");
const configuratorService = require("../services/configurator.service");

/**
 * Creates and saves a new vehicle configuration.
 * @param {string} userId - The ID of the user saving the configuration.
 * @param {string} versionId - The ID of the vehicle version.
 * @param {string[]} optionIds - An array of selected option IDs.
 * @returns {Promise<object>} The newly created configuration.
 */

const create = async (userId, versionId, optionIds) => {
  const priceDetails = await configuratorService.calculatePrice(
    versionId,
    optionIds
  );

  const newConfiguration = await prisma.$transaction(async (tx) => {
    const counter = await tx.counter.update({
      where: { name: "configurationCounter" },
      data: { value: { increment: 1 } },
    });
    const shareableCode = `C-${counter.value.toString().padStart(6, "0")}`;

    const createdConfig = await tx.savedConfiguration.create({
      data: {
        user: { connect: { id: userId } },
        version: { connect: { id: versionId } },
        options: {
          connect: optionIds.map((id) => ({ id })),
        },
        totalPrice: new Prisma.Decimal(priceDetails.totalPrice),
        shareableCode: shareableCode,
      },
      select: {
        id: true,
        shareableCode: true,
        totalPrice: true,
        createdAt: true,
      },
    });
    return createdConfig;
  });

  return newConfiguration;
};

const getByShareableCode = async (shareableCode) => {
  const configuration = await prisma.savedConfiguration.findUnique({
    where: { shareableCode },
    include: {
      version: {
        select: { name: true, sku: true, basePrice: true },
      },
      options: {
        select: { name: true, sku: true, price: true },
      },
    },
  });

  if (!configuration) {
    throw new Error("ConfigurationNotFound");
  }
  return configuration;
};

const getByUserId = async (userId) => {
  return await prisma.savedConfiguration.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      shareableCode: true,
      totalPrice: true,
      createdAt: true,
      version: { select: { name: true } },
    },
  });
};

const remove = async (id) => {
  const existingConfig = await prisma.savedConfiguration.findUnique({
    where: { id },
  });
  if (!existingConfig) {
    throw new Error("ConfigurationNotFound");
  }
  if (existingConfig.order) {
    throw new Error("CannotDelete, ConfigurationInUse");
  }
  await prisma.savedConfiguration.delete({ where: { id } });
};

module.exports = {
  create,
  getByShareableCode,
  getByUserId,
  remove,
};
