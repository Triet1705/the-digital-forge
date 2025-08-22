const { PrismaClient } = require("@prisma/client");
const seedUsers = require("./seeds/seedUsers");
const seedOptions = require("./seeds/seedOptions");
const seedCars = require("./seeds/seedCars");

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.option.deleteMany();
  await prisma.optionCategory.deleteMany();
  await prisma.version.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();
  await prisma.counter.deleteMany();
  console.log("Old data deleted successfully.");

  await seedUsers(prisma);
  await seedOptions(prisma);
  await seedCars(prisma);

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
