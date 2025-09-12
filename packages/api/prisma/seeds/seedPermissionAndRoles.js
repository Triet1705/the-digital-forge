const seedPermissionsAndRoles = async (prisma) => {
  console.log("Seeding permissions and roles...");

  const permissions = [
    "showroom:create",
    "showroom:read",
    "showroom:update",
    "showroom:delete",
    "inventory:read",
    "inventory:update",
    "order:read_all",
    "order:read_own",
    "order:update_status",
    "user:create",
    "user:read",
    "user:update",
    "user:delete",
  ];

  for (const name of permissions) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name, description: `Permission to ${name.replace(":", " ")}` },
    });
  }
  console.log("Permissions seeded.");

  const allPermissions = await prisma.permission.findMany();

  await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: {
      name: "SUPER_ADMIN",
      description: "Has all permissions in the system",
      permissions: {
        connect: allPermissions.map((p) => ({ id: p.id })),
      },
    },
  });

  await prisma.role.upsert({
    where: { name: "USER" },
    update: {},
    create: { name: "USER", description: "Default role for customers" },
  });

  console.log("Roles seeded and permissions assigned.");
};

module.exports = seedPermissionsAndRoles;
