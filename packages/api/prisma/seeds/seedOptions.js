const { Prisma } = require("@prisma/client");

const seedOptions = async (prisma) => {
  console.log("Seeding option categories and options...");

  await prisma.optionCategory.createMany({
    data: [
      { name: "Exterior Color", selectionType: "SINGLE" },
      { name: "Wheels", selectionType: "SINGLE" },
      { name: "Seats", selectionType: "SINGLE" },
    ],
    skipDuplicates: true,
  });

  const colorCategory = await prisma.optionCategory.findUnique({
    where: { name: "Exterior Color" },
  });
  const wheelCategory = await prisma.optionCategory.findUnique({
    where: { name: "Wheels" },
  });

  await prisma.option.createMany({
    data: [
      {
        sku: "CLR-WHITE-0",
        name: "White",
        price: new Decimal("0.00"),
        swatchImageUrl: "/assets/ui/swatches/color_carrara-white-metallic.jpg",
        categoryId: colorCategory.id,
      },
      {
        sku: "CLR-BLACK-0",
        name: "Black",
        price: new Decimal("0.00"),
        swatchImageUrl: "/assets/ui/swatches/color_jet-black-metallic.jpg",
        categoryId: colorCategory.id,
      },
      {
        sku: "CLR-GENTIANBLUE-1",
        name: "Gentian Blue Metallic",
        price: new Decimal("1704.00"),
        swatchImageUrl: "/assets/ui/swatches/color_gentian-blue-metallic.jpg",
        categoryId: colorCategory.id,
      },
      {
        sku: "WHL-CARRERA-BASE",
        name: "19/20-inch Carrera Wheels",
        price: new Decimal("0.00"),
        swatchImageUrl: "/assets/ui/wheels/wheel_carrera-standard.jpg",
        categoryId: wheelCategory.id,
      },
      {
        sku: "WHL-CARRERAS-1",
        name: "20/21-inch Carrera S Wheels",
        price: new Decimal("1900.00"),
        swatchImageUrl: "/assets/ui/wheels/wheel_carrera-s.jpg",
        categoryId: wheelCategory.id,
      },
      {
        sku: "WHL-EXCLUSIVE-CARBON-1",
        name: "20/21-inch Carrera Exclusive Design Wheels with Carbon Blades",
        price: new Decimal("8206.20"),
        swatchImageUrl: "/assets/ui/wheels/wheel_carrera-exclusive-carbon.jpg",
        categoryId: wheelCategory.id,
      },
      {
        sku: "WHL-SPYDER-DS-1",
        name: "20/21-inch RS Spyder wheels in Darksilver",
        price: new Decimal("3230.00"),
        swatchImageUrl: "/assets/ui/wheels/wheel_rs-spyder-darksilver.jpg",
        categoryId: wheelCategory.id,
      },
    ],
  });
  console.log("Options and categories seeded.");
};

module.exports = seedOptions;
