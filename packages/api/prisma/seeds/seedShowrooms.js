const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedShowrooms = async () => {
  console.log("Seeding showrooms...");
  const showroomsData = [
    {
      name: "Porsche Centre Hà Nội",
      address: "562 Nguyễn Văn Cừ, Long Biên, Hà Nội",
      latitude: 21.0478,
      longitude: 105.8825,
      isHeadquarter: false,
    },
    {
      name: "Porsche Centre Sài Gòn",
      address: "17-19, Lô B, Đường 19, KCX Tân Thuận, Quận 7, TP.HCM",
      latitude: 10.7417,
      longitude: 106.7325,
      isHeadquarter: false,
    },
    {
      name: "Porsche Studio Đà Nẵng",
      address: "Lô A2.1, đường 2 tháng 9, Hoà Cường Bắc, Hải Châu, Đà Nẵng",
      latitude: 16.0401,
      longitude: 108.2241,
      isHeadquarter: false,
    },
    {
      name: "Porsche Zuffenhausen, Germany",
      address: "Porscheplatz 1, 70435 Stuttgart, Germany",
      latitude: 48.8359,
      longitude: 9.1523,
      isHeadquarter: true,
    },
  ];

  await prisma.showroom.createMany({
    data: showroomsData,
    skipDuplicates: true,
  });
  console.log("Showrooms seeded.");
};

module.exports = seedShowrooms;
