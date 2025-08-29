// packages/web/src/api/mockData.js
const mockCars = [
  {
    sku: "CAR-911",
    name: "911",
    fuelType: ["GASOLINE"],
    imageSet: {
      showcase:
        "/assets/images/911/911-carrera/911-carrera/base/911-carrera_gentian-blue_carrera-standard_side.avif",
      title: "/assets/images/911/911-title.svg",
    },
    versions: [
      {
        sku: "V911-CARRERA-BASE",
        name: "911 Carrera",
        descriptionTitle: "The one and always.",
        description: "Iconic sports car with rear engine: 2 doors, 2+2 seats.",
        imageUrl:
          "/assets/images/911/911-carrera/911-carrera/base/911-carrera_gentian-blue_carrera-standard_side.avif",
      },
    ],
  },
  {
    sku: "CAR-TAYCAN",
    name: "Taycan",
    fuelType: ["ELECTRIC"],
    imageSet: {
      showcase:
        "/assets/images/taycan/taycan_turbo-s/base/taycan_turbo_s_sport_limousine_sideshot.avif",
      title: "/assets/images/taycan/taycan-title.svg",
    },
    versions: [
      {
        sku: "VTAYCAN-TURBO-S",
        name: "Taycan Turbo S",
        descriptionTitle: "Overfeel.",
        description: "The soul, electrified: 4 doors, up to 5 seats.",
        imageUrl:
          "/assets/images/taycan/taycan_turbo-s/base/taycan_turbo_s_sport_limousine_sideshot.avif",
      },
    ],
  },
  {
    sku: "CAR-PANAMERA",
    name: "Panamera",
    fuelType: ["HYBRID", "GASOLINE"],
    imageSet: {
      showcase:
        "/assets/images/panamera/show-case/panamera-4-e-hybrid-model-intro.avif",
      title: "/assets/images/panamera/panamera-title.svg",
    },
    versions: [
      {
        sku: "VPANAMERA-4-EHYBRID",
        name: "Panamera 4 E-Hybrid",
        descriptionTitle: "More drive. For ambitious destinations.",
        description: "Courage changes everything: 4 doors, 4 seats.",
        imageUrl:
          "/assets/images/panamera/show-case/panamera-4-e-hybrid-model-intro.avif",
      },
    ],
  },
  {
    sku: "CAR-CAYENNE",
    name: "Cayenne",
    fuelType: ["HYBRID", "GASOLINE"],
    imageSet: {
      showcase: "/assets/images/cayenne/show-case/cayenne-side.avif",
      title: "/assets/images/cayenne/cayenne-title.svg",
    },
    versions: [
      {
        sku: "VCAYENNE-BASE",
        name: "Cayenne",
        descriptionTitle: "Further together.",
        description: "Versatile, dynamic, and spacious: 5 doors, 5 seats.",
        imageUrl: "/assets/images/cayenne/show-case/cayenne-side.avif",
      },
    ],
  },
];

export { mockCars };
