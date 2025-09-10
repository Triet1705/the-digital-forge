const bcrypt = require("bcryptjs");

const seedUsers = async (prisma) => {
  console.log("Seeding users and counters...");
  await prisma.counter.upsert({
    where: { name: "userCounter" },
    update: {},
    create: { name: "userCounter", value: 0 },
  });

  const superAdminRole = await prisma.role.findUnique({
    where: { name: "SUPER_ADMIN" },
  });

  if (!superAdminRole) {
    console.error(
      "SUPER_ADMIN role not found. Please run seedPermissionsAndRoles first."
    );
    return;
  }

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
      roles: {
        connect: { id: superAdminRole.id },
      },
    },
  });
  console.log(`Ensured admin user with SUPER_ADMIN role exists.`);
};

module.exports = seedUsers;
