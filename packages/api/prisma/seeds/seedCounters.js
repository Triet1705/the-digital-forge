// packages/api/prisma/seeds/seedCounters.js

const seedCounters = async (prisma) => {
  console.log("Seeding counters...");

  await prisma.counter.upsert({
    where: { name: "userCounter" },
    update: {},
    create: { name: "userCounter", value: 0 },
  });

  await prisma.counter.upsert({
    where: { name: "showroomCounter" },
    update: {},
    create: { name: "showroomCounter", value: 0 },
  });

  await prisma.counter.upsert({
    where: { name: "configurationCounter" },
    update: {},
    create: { name: "configurationCounter", value: 0 },
  });

  console.log("Counters seeded.");
};

module.exports = seedCounters;
