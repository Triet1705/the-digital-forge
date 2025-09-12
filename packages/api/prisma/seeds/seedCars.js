const { Prisma } = require("@prisma/client");

const seedCars = async (prisma) => {
  console.log("Seeding cars and versions...");
  const carData = [
    //--- 911 ---//
    {
      sku: "CAR-911",
      name: "Porsche 911",
      imageSet: {
        showcase: "/assets/images/911/show-case/porsche-911-carrera-gts.avif",
        title: "/assets/images/911/911-title.svg",
        card: "",
      },
      fuelType: ["GASOLINE"],
      category: "SPORT",
      versions: {
        create: [
          {
            sku: "V911-CARRERA-BASE",
            name: "911 Carrera",
            bodyType: ["COUPE"],
            seats: ["TWO_PLUS_TWO"],
            basePrice: new Prisma.Decimal("132000.00"),
            variantGroup: "Coupé",
            baseSpecs: [
              {
                label:
                  "Fuel consumption combined (model range): 10.5 - 10.0 l/100 km, CO₂-emissions combined (model range): 240 - 229 g/km",
              },
              {
                label: "Acceleration 0 -100 km/h with Sport Chrono Package",
                value: "3.9 s",
              },
              { label: "Power (kW) / Power (PS)", value: "290 kW / 394 PS" },
              { label: "Top speed", value: "294 km/h" },
            ],
            // carId: porsche911.id,
            specs: {
              power: 394,
              acceleration: 3.9,
              topSpeed: 294,
            },
            showcaseImages: {
              configuratorCard: [
                "/assets/images/911/911-carrera/911-carrera/base/911-carrera_gentian-blue_carrera-standard_side.avif",
                "/assets/images/911/911-carrera/911-carrera/base/911-carrera_gentian-blue_carrera-standard_angle-front_base.webp",
                "/assets/images/911/911-carrera/911-carrera/base/911-carrera_gentian-blue_carrera-standard_angle-rear_base.webp",
              ],
            },
            descriptionTitle: "The one and always.",
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
                  id: "design",
                  title: "Design.",
                  description:
                    "Clear lines and a muscular rear section create a much sharper character. On the GTS models, the newly designed front apron with striking vertical aerodynamic elements including adaptive air intake flaps provide a further distinctive visual feature.",
                  imageUrl:
                    "/assets/images/911/911-carrera/911-carrera/detail/911-carrera-gts-side.avif",
                },
                {
                  id: "headlights",
                  title: "Headlights.",
                  description:
                    "Expressive and typically Porsche: the new Matrix LED main headlights, including all lighting functions such as the 4-point daytime running lights, increase the distinctive look of the 911 from afar with their lighting signature.",
                  imageUrl:
                    "/assets/images/911/911-carrera/911-carrera/detail/911-carrera-gts-headlight.avif",
                },
                {
                  id: "dynamics",
                  title: "Dynamics.",
                  description:
                    "The PASM sports chassis (-10 mm) with helper springs at the rear and the rear-axle steering increase the performance on the circuit as standard on the 911 Carrera GTS models.",
                  imageUrl:
                    "/assets/images/911/911-carrera/911-carrera/detail/911-carrera-gts-rear.avif",
                },
              ],
              detailImages: [
                {
                  id: "side-911",
                  imageUrl:
                    "/assets/images/911/911-carrera/911-carrera/detail/911-carrera_gentian-blue_carrera-standard_side_base.webp",
                  altText: "",
                },
                {
                  id: "front-911",
                  imageUrl:
                    "/assets/images/911/911-carrera/911-carrera/detail/911-carrera_gentian-blue_carrera-standard_front.avif",
                  altText: "",
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
        ],
      },
    },

    //--- TAYCAN ---//
    {
      sku: "CAR-TAYCAN",
      name: "Porsche Taycan",
      imageSet: {
        showcase: "/assets/images/taycan/show-case/porsche-taycan-2025.webp",
        title: "/assets/images/taycan/taycan-title.svg",
        card: "",
      },
      fuelType: ["ELECTRIC"],
      category: "SEDAN",
      versions: {
        create: [
          {
            sku: "VTAYCAN-TURBO-S",
            name: "Taycan Turbo S",
            bodyType: ["SPORT_SALOON"],
            seats: ["FOUR_PLUS_ONE"],
            basePrice: new Prisma.Decimal("194900.00"),
            variantGroup: "Sedan",
            baseSpecs: [
              {
                label:
                  "Electric energy consumption combined (model range): 19.9 - 17.8 kWh/100 km, CO₂-emissions combined (model range): 0 g/km",
              },
              {
                label: "Acceleration 0 -100 km/h with Launch Control",
                value: "2.4 s",
              },
              {
                label:
                  "Overboost Power with Launch Control up to (kW) / Overboost Power with Launch COntrol up to (PS)",
                value: "700 kW / 952 PS",
              },
              { label: "Top speed", value: "260 km/h" },
            ],
            // carId: taycan.id,
            specs: {
              acceleration: 2.4,
              topSpeed: 260,
              power: 952,
            },
            showcaseImages: {
              configuratorCard: [
                "/assets/images/taycan/taycan_turbo-s/base/taycan_turbo_s_sport_limousine_sideshot.avif",
              ],
            },
            descriptionTitle: "Overfeel.",
            description:
              "The overwhelming feeling of sitting in an amazing electric sports car: the new Taycan makes electricity even more electrifying. Performance even more impressive. And the extraordinary even more outstanding.",
            galleryImages: {
              "Porsche E-Performance.": [
                {
                  id: "performance-battery",
                  title: "Performance Battery Plus.",
                  description:
                    "The optimised cell chemistry of the 33-module battery enables higher energy density - for increased performance that also delivers long range. A new cooling concept for the heat pump, which is now standard, also increases efficiency.",
                  imageUrl: "",
                },
                {
                  id: "800v-technology",
                  title: "800V technology.",
                  description:
                    "For fast charging with up to 320 kW chargin power and outstanding performance, the batteries are based on 800V technology. The technology also enables smaller cable cross-sections, for reduced vehicle weight.",
                  imageUrl: "",
                },
                {
                  id: "air-suspension",
                  title: "Air suspension.",
                  description:
                    "The adaptive air suspension with PASM reacts extremely quickly to dynamic changes while driving-depending on preferences and the selected driving mode with a focus on sportiness o comfort. For driving over uneven surfaces, the Smart Lift function raises the vehicle at the push of a button and saves the location so that it can react automatically in the futur.",
                  imageUrl: "",
                },
                {
                  id: "rear-axle-steering",
                  title: "Rear-axle steering.",
                  description:
                    "The optional rear-axle steering, which is standard on the Taycan Turbo S, ensure more dynamic steering behavior while corncering and makes manoeuvring and parking in tight spaces much easier.",
                  imageUrl: "",
                },
                {
                  id: "porsche-active-ride",
                  title: "Porsche Active Ride.",
                  description:
                    "The optional Porsche Active Ride takes the balance between comfort and agility to a whole new level. The system generates wheel-specific tensile and com-pressive forces as required, allowing it to compensate for body movements and increase sportiness",
                  imageUrl: "",
                },
              ],
              highlights: [],
            },
            technicalDetails: {
              height: "1,378 mm",
              length: "4,962 mm",
              wheelbase: "2,900 mm",
              width: "1,966 mm",
              imageUrl:
                "/asset/images/taycan/details/taycan-technical-top-view.svg",
            },
            detailedSpecs: {
              "Power unit": [
                { label: "Power up to (kW)", value: "570 kW" },
                { label: "Power up to (PS)", value: "775 PS" },
                { label: "Power NAR up to (HP)", value: "764 HP" },
                {
                  label: "Overboost Power with Launch Control up to (kW)",
                  value: "700 kW",
                },
                {
                  label: "Overboost Power with Launch Control up to (PS)",
                  value: "952 PS",
                },
                {
                  label: "Overboost Power NAR with Launch Control up to (HP)",
                  value: "938 hp",
                },
                {
                  label: "Max. torque with Launch Control up to",
                  value: "1,110 Nm",
                },
                { label: "30-Minutes-Power", value: "163 kW" },
              ],
              Performance: [
                { label: "Top speed", value: "260 km/h" },
                {
                  label: "Acceleration 0 - 60 mph with Launch Control",
                  value: "2.3 s",
                },
                {
                  label: "Acceleration 0 - 100 km/h with Launch Control",
                  value: "2.4 s",
                },
                {
                  label: "Acceleration 0 - 160 km/h with Launch Control",
                  value: "5.2 s",
                },
                {
                  label: "Acceleration 0 - 200 km/h with Launch Control",
                  value: "7.7 s",
                },
                {
                  label:
                    "Acceleration (80-120km/h) (50-75 mph) with Launch Control",
                  value: "1.4 s",
                },
              ],
              "Consumption/Emissions (WLTP)": [
                {
                  label: "Electric energy consumption combined (model range)",
                  value: "19.9 - 17.8 kWh/100 km",
                },
                {
                  label: "Electric energy consumption city (model range)",
                  value: "17.9 - 16.1 kWh/100 km",
                },
                {
                  label: "CO₂-emissions combined (model range)",
                  value: "0 g/km",
                },
                {
                  label: "Electric energy consumption combined (Vehicle High)",
                  value: "22.3 kWh/100km",
                },
                {
                  label:
                    "Electric energy consumption (City) combined (Vehicle High)",
                  value: "19.3 kWh/100km",
                },
              ],
              Body: [
                { label: "Length", value: "4,962 mm" },
                { label: "Width (with mirrors)", value: "2,144 mm" },
                { label: "Width (with mirrors folded)", value: "1,950 mm" },
                { label: "Height", value: "1,378 mm" },
                { label: "Wheelbase", value: "2,900 mm" },
                {
                  label:
                    "Turning circle (Performance Battery Plus) (Rear-Axle Steering)",
                  value: "11.1 m",
                },
                {
                  label: "Tire track turning circle",
                  value: "10.4 m",
                },
                { label: "Maximum load", value: "575 kg" },
                { label: "Payload, maximum", value: "565 kg" },
              ],
              Capacities: [
                { label: "Luggage compartment volume, front", value: "81 l" },
                {
                  label: "Luggage compartment volume, rear V210-2",
                  value: "366 l",
                },
              ],
            },
          },
        ],
      },
    },

    //--- PANAMERA ---//
    {
      sku: "CAR-PANAMERA",
      name: "Porsche Panamera",
      imageSet: {
        showcase:
          "/assets/images/panamera/show-case/porsche-panamera-2025.webp",
        title: "/assets/images/panamera/panamera-title.svg",
        card: "",
      },
      fuelType: ["HYBRID", "GASOLINE"],
      category: "SEDAN",

      versions: {
        create: [
          {
            sku: "VPANAMERA-4-EHYBRID",
            name: "Panamera 4 E-Hybrid",
            bodyType: ["SPORT_SALOON"],
            seats: ["FOUR_PLUS_ONE"],
            basePrice: new Prisma.Decimal("115500.00"),
            variantGroup: "Sedan",
            baseSpecs: [
              {
                label:
                  "Fuel consumption (weighted) combined (model range): 3.8 - 3.0 l/100 km, Electric energy consumption (weighted) combined (model range): 28.2 - 17.9 kWh/100 km, CO₂-emissions (weighted) combined (model range): 86 - 69 g/km, Fuel consumption (sustaining) combined (model range): 9.7 - 8.7 l/100 km",
              },
              {
                label: "Acceleration 0 - 100 km/h with Sport Chrono Package",
                value: "4.1 s",
              },
              {
                label: "Power combined (kW) / Power combined (PS)",
                value: "346 kW / 470 PS",
              },
              { label: "Top speed", value: "280 km/h" },
            ],
            // carId: panamera.id,
            specs: {
              acceleration: 4.1,
              topSpeed: 280,
              power: 304,
            },
            showcaseImages: {
              configuratorCard: [
                "/assets/images/panamera/show-case/panamera-4-e-hybrid-model-intro.avif",
              ],
            },
            descriptionTitle: "More drive. For ambitious destinations.",
            description:
              "The Panamera 4 E-Hybrid turns travel into a sporting event and business into pure pleasure. With impressive system performance, made possible by the perfect interaction between the combustion engine and the electric motor.",
            galleryImages: { drive: [], highlights: [] },
            technicalDetails: {
              length: "5,052 mm",
              wheelbase: "2,950 mm",
              width: "1,937 mm",
              imageUrl:
                "/assets/images/panamera/details/panamera-4-e-hybrid-technical-drawing.svg",
            },
            detailedSpecs: {
              "Power unit": [
                { label: "Number of cylinders", value: "6" },
                { label: "Fuel grade", value: "98" },
                { label: "Bore", value: "84.5 mm" },
                { label: "Stroke", value: "86.0 mm" },
                { label: "Power (kW)", value: "224 kW" },
                { label: "Power (PS)", value: "304 PS" },
                { label: "Power NAR (hp)", value: "300 HP" },
                { label: "Maximum engine speed", value: "6,800 1/min" },
                { label: "Max. torque", value: "420 Nm" },
                { label: "Power combined (kW)", value: "346 kW" },
                { label: "Power combined (PS)", value: "470 PS" },
                { label: "Power combined NAR (hp)", value: "463 HP" },
                { label: "Torque combined", value: "650 Nm" },
              ],
              Performance: [
                { label: "Top speed", value: "280 km/h" },
                {
                  label: "Acceleration 0 - 60 mph with Sport Chrono Package",
                  value: "3.9 s",
                },
                {
                  label: "Acceleration 0 - 100 km/h with Sport Chrono Package",
                  value: "4.1 s",
                },
                {
                  label: "Acceleration 0 - 160 km/h with Sport Chrono Package",
                  value: "10.0 s",
                },
                {
                  label: "Acceleration 0 - 200 km/h with Sport Chrono Package",
                  value: "16.2 s",
                },
                {
                  label:
                    "In-gear acceleration (80-120km/h) (50-75 mph) with Sport Chrono Package",
                  value: "2.8 s",
                },
              ],
              "Consumption/Emissions (WLTP)": [],
              Body: [
                { label: "Length", value: "5,052 mm" },
                { label: "Width", value: "1,937 mm" },
                { label: "Width (with mirrors)", value: "2,165 mm" },
                { label: "Width (with mirrors folded)", value: "1,983 mm" },
                {
                  label: "Height, air suspension (standard level)",
                  value: "1,419 mm",
                },
                { label: "Wheelbase", value: "2,950 mm" },
                {
                  label:
                    "Turning circle (8-speed Porsche Doppelkupplung (PDK))",
                  value: "11.9 m",
                },
                {
                  label:
                    "Turning circle (8-speed Porsche Doppelkupplung (PDK)) (Rear-Axle Steering)",
                  value: "11.4 m",
                },
                {
                  label:
                    "Tire track turning circle (8-speed Porsche Doppelkupplung (PDK))",
                  value: "11.2 m",
                },
                {
                  label:
                    "Tire track turning circle (8-speed Porsche Doppelkupplung (PDK)) (Rear-Axle Steering)",
                  value: "10.7 m",
                },
              ],
              Capacities: [
                {
                  label:
                    "Open luggage compartment volume (up to the upper edge of the rear seats)",
                  value: "430 l",
                },
                {
                  label:
                    "Largest luggage compartment volume (behind front seats, up to roof)",
                  value: "1,264 l",
                },
              ],
            },
          },
        ],
      },
    },

    //--- CAYENNE ---//
    {
      sku: "CAR-CAYENNE",
      name: "Porsche Cayenne",
      imageSet: {
        showcase: "/assets/images/cayenne/show-case/porsche-cayenne-2025.webp",
        title: "/assets/images/cayenne/cayenne-title.svg",
        card: "",
      },
      fuelType: ["HYBRID", "GASOLINE"],
      category: "SUV",

      versions: {
        create: [
          {
            sku: "VCAYENNE-BASE",
            name: "Cayenne",
            bodyType: ["SUV"],
            seats: ["FOUR_PLUS_ONE"],
            basePrice: new Prisma.Decimal("89500.00"),
            variantGroup: "SUV",
            baseSpecs: [
              {
                label:
                  "Fuel consumption combined (model range): 11.7 – 10.7 l/100 km, CO₂-emissions combined (model range): 267 – 243 g/km",
              },
              {
                label: "Acceleration 0 - 100 km/h with Sport Chrono Package",
                value: "5.7 s",
              },
              { label: "Power (kW) / Power (PS)", value: "260 kW / 353 PS" },
              { label: "Top speed", value: "248 km/h" },
            ],
            // carId: cayenne.id,
            specs: { power: 353, acceleration: 5.7, topSpeed: 248 },
            showcaseImages: {
              configuratorCard: [
                "/assets/images/cayenne/show-case/cayenne-side.avif",
              ],
            },
            descriptionTitle: "Further together.",
            description:
              "Over 20 years ago we asked ourselves if a sports car could celebrate more than the individual. The Cayenne provided the answer. And it continues to perfect it to this day. For people who want to tread their own path.",
            galleryImages: { drive: [], highlights: [] },
            technicalDetails: {
              length: "4,930 mm",
              wheelbase: "2,895 mm",
              width: "1,983 mm",
              imageUrl:
                "/assets/images/cayenne/cayenne-base/details/cayenne-technical-drawing.svg",
            },
            detailedSpecs: {
              "Power unit": [
                { label: "Number of cylinders", value: "6" },
                { label: "Fuel grade", value: "98" },
                { label: "Bore", value: "84.5 mm" },
                { label: "Stroke", value: "89.0 mm" },
                { label: "Power (kW)", value: "260 kW" },
                { label: "Power (PS)", value: "353 PS" },
                { label: "Power NAR (hp)", value: "348 HP" },
                { label: "Maximum engine speed", value: "6,500 1/min" },
                { label: "Max. torque", value: "500 Nm" },
                { label: "Max. output per liter (kW/l)", value: "87.00 kW/l" },
                { label: "Max. output per liter (PS/l)", value: "118.00 PS/l" },
                { label: "Max. output per liter (hp/l)", value: "116.0 hp" },
              ],
              Performance: [
                { label: "Top speed", value: "248 km/h" },
                { label: "Acceleration 0 - 60 mph", value: "5.7 s" },
                {
                  label: "Acceleration 0 - 60 mph with Sport Chrono Package",
                  value: "5.4 s",
                },
                { label: "Acceleration 0 - 100 km/h", value: "6.0 s" },
                {
                  label: "Acceleration 0 - 100 km/h with Sport Chrono Package",
                  value: "5.7 s",
                },
                { label: "Acceleration 0 - 160 km/h", value: "13.9 s" },
                {
                  label: "Acceleration 0 - 160 km/h with Sport Chrono Package",
                  value: "13.6 s",
                },
                { label: "Acceleration 0 - 200 km/h", value: "24.0 s" },
                {
                  label: "Acceleration 0 - 200 km/h with Sport Chrono Package",
                  value: "23.7 s",
                },
                {
                  label: "In-gear acceleration (80-120km/h) (50-75 mph)",
                  value: "4.0 s",
                },
              ],
              "Consumption/Emissions (WLTP)": [],
              Body: [
                { label: "Length", value: "4,930 mm" },
                { label: "Width", value: "1,983 mm" },
                { label: "Width (with mirrors)", value: "2,194 mm" },
                { label: "Width (with mirrors folded)", value: "1,997 mm" },
                {
                  label: "Height, air suspension (standard level)",
                  value: "1,679 mm",
                },
                { label: "Wheelbase", value: "2,895 mm" },
                {
                  label: "Turning circle (8-speed automatic gearbox)",
                  value: "12.1 m",
                },
                {
                  label:
                    "Turning circle (8-speed automatic gearbox) (Rear-Axle Steering)",
                  value: "11.5 m",
                },
                {
                  label:
                    "Tire track turning circle (8-speed automatic gearbox)",
                  value: "11.3 m",
                },
                {
                  label:
                    "Tire track turning circle (8-speed automatic gearbox) (Rear-Axle Steering)",
                  value: "10.7 m",
                },
                { label: "Maximum load", value: "780 kg" },
                { label: "Payload, maximum", value: "713 kg" },
              ],
              Capacities: [
                {
                  label: "Luggage compartment volume, rear V210-2",
                  value: "698 l",
                },
                {
                  label:
                    "Open luggage compartment volume (up to the upper edge of the rear seats)",
                  value: "772 l",
                },
                {
                  label:
                    "Largest luggage compartment volume (behind front seats, up to roof)",
                  value: "1,708 l",
                },
              ],
            },
          },
        ],
      },
    },
  ];
  try {
    for (const car of carData) {
      await prisma.car.create({
        data: car,
      });
    }
    console.log("Cars and versions seeded successfully with nested structure.");
  } catch (error) {
    console.error("Error seeding cars:", error);
  }
};

module.exports = seedCars;
