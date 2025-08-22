const bcrypt = require("bcryptjs");

const seedUsers = async (prisma) => {
  console.log("Seeding users and counters...");
  await prisma.counter.upsert({
    where: { name: "userCounter" },
    update: {},
    create: { name: "userCounter", value: 0 },
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin123", salt);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@tdforge.com" },
    update: {},
    create: {
      userCode: "TDF-000000",
      email: "admin@tdforge.com",
      firstName: "Admin",
      lastName: "TDForge",
      password: hashedPassword,
      roles: ["ADMIN", "USER"],
    },
  });
  console.log(`Ensured admin user exists: ${adminUser.email}`);
};

module.exports = seedUsers;
