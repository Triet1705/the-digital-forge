const { prismaMock } = require("./lib/prismaMock");
const request = require("supertest");
const app = require("../server");

describe("Car API Routes", () => {
  describe("GET /api/cars", () => {
    it("should return a list of cars and a 200 status code", async () => {
      const mockCars = [
        {
          id: "car-id-1",
          sku: "CAR-911",
          name: "Porsche 911",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "car-id-2",
          sku: "CAR-TAYCAN",
          name: "Porsche Taycan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaMock.car.findMany.mockResolvedValue(mockCars);

      const response = await request(app).get("/api/cars");

      expect(response.status).toBe(200);
      expect(JSON.parse(response.text)).toEqual(
        mockCars.map((car) => ({
          ...car,
          createdAt: car.createdAt.toISOString(),
          updatedAt: car.updatedAt.toISOString(),
        }))
      );
      expect(prismaMock.car.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
