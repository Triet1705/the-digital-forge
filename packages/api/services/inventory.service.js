const { prisma } = require("../lib/prisma");

const getAll = async (filters) => {
  return await prisma.inventory.findMany({
    where: filters,
    select: {
      id: true,
      quantity: true,
      version: { select: { name: true, sku: true } },
      showroom: { select: { name: true, showroomCode: true } },
    },
  });
};

const create = async (data) => {
  const { versionId, showroomId, quantity } = data;
  return await prisma.inventory.create({
    data: { versionId, showroomId, quantity },
  });
};

const update = async (id, data) => {
  const existingInventory = await prisma.inventory.findUnique({
    where: { id },
  });

  if (!existingInventory) {
    throw new Error("InventoryNotFound");
  }

  return await prisma.inventory.update({
    where: { id },
    data: { quantity: data.quantity },
  });
};

const remove = async (id) => {
  const existingInventory = await prisma.inventory.findUnique({
    where: { id },
  });
  if (!existingInventory) {
    throw new Error("InventoryNotFound");
  }
  await prisma.inventory.delete({ where: { id } });
};

const checkInventory = async (versionId) => {
  const inventoryRecords = await prisma.inventory.findMany({
    where: { versionId: versionId, quantity: { gt: 0 } },
    include: {
      showroom: true,
    },
  });

  if (inventoryRecords.length === 0) {
    return { status: "OUT_OF_STOCK" };
  }

  const inStockVn = inventoryRecords.some((inv) => !inv.showroom.isHeadquarter);
  if (inStockVn) {
    return { status: "IN_STOCK_VN" };
  }

  const inStockDe = inventoryRecords.some((inv) => inv.showroom.isHeadquarter);
  if (inStockDe) {
    return {
      status: "IN_STOCK_DE",
      // message:
      //   "Xe có sẵn tại trụ sở chính ở Đức. Thời gian vận chuyển dự kiến là 30 ngày.",
      message: "Car available at Germany HQ. Estimate delivery about 30 days.",
    };
  }

  return { status: "OUT_OF_STOCK" };
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  checkInventory,
};
