// packages/web/src/api/mockData.js
export const originalCars = [
  {
    sku: "CAR-911",
    name: "911",
    descriptionTitle: "The one and always.",
    description: "Iconic sports car with rear engine: 2 doors, 2+2 seats.",
    imageUrl:
      "/assets/images/911/911-carrera/911-carrera/base/911-carrera_gentian-blue_carrera-standard_side.avif",
  },
  {
    sku: "CAR-TAYCAN",
    name: "Taycan",
    descriptionTitle: "Overfeel.",
    description: "The soul, electrified: 4 doors, up to 5 seats.",
    imageUrl:
      "/assets/images/taycan/taycan_turbo-s/base/taycan_turbo_s_sport_limousine_sideshot.avif",
  },
  {
    sku: "CAR-PANAMERA",
    name: "Panamera",
    descriptionTitle: "More drive. For ambitious destinations.",
    description: "Courage changes everything: 4 doors, 4 seats.",
    imageUrl:
      "/assets/images/panamera/show-case/panamera-4-e-hybrid-model-intro.avif",
  },
  {
    sku: "CAR-CAYENNE",
    name: "Cayenne",
    descriptionTitle: "Further together.",
    description: "Versatile, dynamic, and spacious: 5 doors, 5 seats.",
    imageUrl: "/assets/images/cayenne/show-case/cayenne-side.avif",
  },
];

export const mockCars = [
  ...originalCars,
  ...originalCars.map((car) => ({ ...car, sku: `${car.sku}-2` })),
];
