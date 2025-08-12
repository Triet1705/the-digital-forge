const { PrismaClient } = require("@prisma/client");
const { Decimal } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.version.deleteMany();
  await prisma.car.deleteMany();
  console.log("Old data deleted successfully.");

  const porsche911 = await prisma.car.create({
    data: {
      id: "porsche-911",
      name: "Porsche 911",
    },
  });
  console.log(`Created car with id: ${porsche911.id}`);

  const carrera = await prisma.version.create({
    data: {
      id: "carrera",
      name: "911 Carrera",
      basePrice: new Decimal("132000.00"),
      variantGroup: "Coupé",
      carId: porsche911.id,
      specs: {
        power: 394,
        acceleration: 3.9,
        topSpeed: 294,
      },
      showcaseImages: {
        configuratorCard: [
          "/assets/images/911/911-carrera/911-carrera/base/911-carrera_gentian-blue_carrera-standard_angle-front_base.webp",
          "/assets/images/911/911-carrera/911-carrera/base/911-carrera_gentian-blue_carrera-standard_angle-rear_base.webp",
          "/assets/images/911/911-carrera/911-carrera/base/911-carrera_gentian-blue_carrera-standard_side.avif",
        ],
      },
    },
  });
  console.log(`Created version with id: ${carrera.id}`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error("An error occurred during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Disconnecting Prisma Client...");
    await prisma.$disconnect();
  });
