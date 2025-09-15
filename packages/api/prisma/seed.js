const { PrismaClient } = require("@prisma/client");
const seedUsers = require("./seeds/seedUsers");
const seedOptions = require("./seeds/seedOptions");
const seedCars = require("./seeds/seedCars");
const seedShowrooms = require("./seeds/seedShowrooms");
const seedInventory = require("./seeds/seedInventory");
const seedPermissionsAndRoles = require("./seeds/seedPermissionAndRoles");
const seedCounters = require("./seeds/seedCounters");

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.inventory.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.order.deleteMany();
  await prisma.savedConfiguration.deleteMany();
  await prisma.option.deleteMany();
  await prisma.optionCategory.deleteMany();

  await prisma.showroom.deleteMany();
  await prisma.version.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();
  await prisma.counter.deleteMany();
  console.log("Old data deleted successfully.");

  await seedCounters(prisma);
  await seedPermissionsAndRoles(prisma);
  await seedUsers(prisma);
  await seedOptions(prisma);
  await seedCars(prisma);
  await seedShowrooms(prisma);
  await seedInventory(prisma);

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
