const { PrismaClient } = require("@prisma/client");
const { Decimal } = require("@prisma/client/runtime/library");
const bcrypt = require("bcryptjs");
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

  const porsche911 = await prisma.car.create({
    data: {
      id: "porsche-911",
      sku: "CAR-911",
      name: "Porsche 911",
    },
  });
  console.log(`Created car with id: ${porsche911.id}`);

  const carrera = await prisma.version.create({
    data: {
      id: "carrera",
      sku: "V911-CARRERA-BASE",
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
      description:
        "Anyone who dreams of a Porsche usually has an image in their mind: the 911 has been the epitome of an exciting, powerful sports car with day-to-day usability for 60 years. Take a seat behind the wheel of the new 911 and become part of a unique community.",
      galleryImages: {
        drive: [
          {
            id: "engine",
            title: "3.0-litre flat-6 engine",
            description:
              "The powerful 3.0-litre 6-cylinder flat engine with twin turbochargers will give you goosebumps with its incomparable sound alone. The horizontally oposed construction and the traditional position in the rear end of the vehicle also allows for a low centre of gravity",
            imageUrl:
              "/assets/images/911/911-carrera/911-carrera/detail/911-carrera-engine.avif",
          },
          {
            id: "performance",
            title: "Performance.",
            description:
              "Peak performances: 290kW (394PS). Top speed: 294km/h. With this techinal data, a maximum torque of 450Nm and a sprint from 0 to 100km/h in 4.1 s, it's highly unlikely that you will ever want to get out again.",
            imageUrl:
              "/assets/images/911/911-carrera/911-carrera/detail/911-carrera-performance.avif",
          },
          {
            id: "pdk",
            title: "PDK.",
            description:
              "The 8-speed Porsche Doppelkupplung (PDK) allows extremely fast gear changes without interrupting the flow of power - even by a milisecond. The PDK combines sports tuning in 1st to 6th gear with efficient overdrive ratios (7th and 8th gear).",
            imageUrl:
              "/assets/images/911/911-carrera/911-carrera/detail/911-carrera-pdk.avif",
          },
        ],
        highlights: [
          {
            id: "dynamics",
            title: "Dynamics.",
            description: "The PASM sports chassis...",
            imageUrl:
              "/assets/images/911/911-carrera/911-carrera/detail/highlight_dynamics.jpg",
          },
        ],
      },
      technicalDetails: {
        height: "1,302 mm",
        length: "4,542 mm",
        wheelbase: "2,450 mm",
        width: "1,852 mm",
        imageUrl:
          "/assets/images/911/911-carrera/911-carrera/detail/911-carrera-technical-drawing.svg",
      },
      detailedSpecs: {
        "Power unit": [
          { label: "Number of cylinders", value: "6" },
          { label: "Bore", value: "91.0 mm" },
          { label: "Stroke", value: "76.4 mm" },
          { label: "Displacement", value: "2,981 cm³" },
          { label: "Power (kW)", value: "290 kW" },
          { label: "Power (PS)", value: "394 PS" },
          { label: "Maximum engine speed", value: "7,500 1/min" },
          { label: "Max. torque", value: "450 Nm" },
        ],
        Performance: [
          { label: "Top speed", value: "294 km/h" },
          {
            label: "Acceleration 0 - 100 km/h",
            value: "4.1 s",
          },
          {
            label: "Acceleration 0 - 100 km/h with Sport Chrono Package",
            value: "3.9 s",
          },
        ],
        "Consumption/Emissions (WLTP)": [
          {
            label: "Fuel consumption combined (model range)",
            value: "10.5 - 10.0 l/100 km",
          },
          {
            label: "CO₂-emissions combined (model range)",
            value: "240 - 229 g/km",
          },
        ],
        Body: [
          { label: "Length", value: "4,542 mm" },
          { label: "Width (with mirrors)", value: "2,033 mm" },
          { label: "Width (with mirrors folded)", value: "1,834 mm" },
          { label: "Height", value: "1,302 mm" },
          { label: "Wheelbase", value: "2,450 mm" },
          { label: "Turning circle", value: "11.2m" },
        ],
        Capacities: [
          { label: "Luggage compartment volume, front", value: "135 l" },
          {
            label: "Open luggage compartment volume (behind front seats)",
            value: "373 l",
          },
          {
            label:
              "Open luggage compartment volume (behind front seats) (Rear Seats)",
            value: "261 l",
          },
        ],
      },
    },
  });

  console.log(`Created version with id: ${carrera.id}`);

  console.log("Creating option categories...");

  await prisma.optionCategory.createMany({
    data: [{ name: "Exterior Color" }, { name: "Wheels" }, { name: "Seats" }],
    skipDuplicates: true,
  });

  console.log("Option categories created.");

  console.log("Creating options with prices...");

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

  console.log("Options created.");

  await prisma.version.update({
    where: { id: "carrera" },
    data: { basePrice: new Decimal("134000.00") },
  });

  console.log("Base price updated.");

  console.log("Creating default admin user...");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin123", salt);

  const adminUser = await prisma.user.create({
    data: {
      userCode: "TDF-000000",
      email: "admin@tdforge.com",
      firstName: "Admin",
      lastName: "TDForge",
      password: hashedPassword,
      roles: ["ADMIN", "USER"],
    },
  });
  console.log(
    `Created admin user: ${adminUser.email} with userCode: ${adminUser.userCode}`
  );

  console.log("Creating initial counter...");
  await prisma.counter.upsert({
    where: { name: "userCounter" },
    update: {},
    create: {
      name: "userCounter",
      value: 0,
    },
  });

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
