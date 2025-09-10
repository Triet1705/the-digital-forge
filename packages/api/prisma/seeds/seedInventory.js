const { PrismaClient } = require("@prisma/client");

const seedInventory = async (prisma) => {
  console.log("Seeding inventory...");

  const porsche911Carrera = await prisma.version.findUnique({
    where: { sku: "V911-CARRERA-BASE" },
  });
  const taycanTurboS = await prisma.version.findUnique({
    where: { sku: "VTAYCAN-TURBO-S" },
  });
  const panamera4EHybrid = await prisma.version.findUnique({
    where: { sku: "VPANAMERA-4-EHYBRID" },
  });

  const hanoiShowroom = await prisma.showroom.findUnique({
    where: { name: "Porsche Centre Hà Nội" },
  });
  const saigonShowroom = await prisma.showroom.findUnique({
    where: { name: "Porsche Centre Sài Gòn" },
  });
  const danangShowroom = await prisma.showroom.findUnique({
    where: { name: "Porsche Studio Đà Nẵng" },
  });
  const germanHQ = await prisma.showroom.findUnique({
    where: { name: "Porsche Zuffenhausen, Germany" },
  });

  if (
    !porsche911Carrera ||
    !taycanTurboS ||
    !panamera4EHybrid ||
    !hanoiShowroom ||
    !saigonShowroom ||
    !danangShowroom ||
    !germanHQ
  ) {
    console.error(
      "Required versions or showrooms not found. Please ensure seedCars and seedShowrooms ran successfully and SKUs/names are correct."
    );
    return;
  }

  const inventoryData = [
    {
      versionId: porsche911Carrera.id,
      showroomId: hanoiShowroom.id,
      quantity: 5,
    },
    {
      versionId: porsche911Carrera.id,
      showroomId: saigonShowroom.id,
      quantity: 3,
    },

    { versionId: taycanTurboS.id, showroomId: saigonShowroom.id, quantity: 10 },
    { versionId: taycanTurboS.id, showroomId: danangShowroom.id, quantity: 4 },

    { versionId: panamera4EHybrid.id, showroomId: germanHQ.id, quantity: 7 },
  ];

  for (const item of inventoryData) {
    await prisma.inventory.upsert({
      where: {
        versionId_showroomId: {
          versionId: item.versionId,
          showroomId: item.showroomId,
        },
      },
      update: { quantity: item.quantity },
      create: item,
    });
  }

  console.log("Inventory seeded.");
};

module.exports = seedInventory;
