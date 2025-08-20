const request = require("supertest");
const express = require("express");
const { mockDeep, mockReset } = require("jest-mock-extended");
const configuratorController = require("../controllers/configuratorController");
const prisma = require("../lib/prisma");

function FakeDecimal(value) {
  this.value = parseFloat(value);
  this.plus = function (otherDecimal) {
    return new FakeDecimal(this.value + otherDecimal.value);
  };
  this.toFixed = function (places) {
    return this.value.toFixed(places);
  };
}

const app = express();
app.use(express.json());
const router = express.Router();

router.post(
  "/:versionId/calculate",
  configuratorController.calculateConfiguration(prisma, {
    Decimal: FakeDecimal,
  })
);
app.use("/api/versions", router);

describe("Configurator API Routes", () => {
  beforeEach(() => {});

  it("should calculate the total price correctly and return 200", async () => {
    const versionId = "carrera";
    const selectedIds = ["clr-blue-id", "whl-s-id"];

    const mockVersion = { basePrice: new FakeDecimal("134000.00") };
    const mockOptions = [
      { price: new FakeDecimal("1704.00") },
      { price: new FakeDecimal("1900.00") },
    ];

    jest.spyOn(prisma.version, "findUnique").mockResolvedValue(mockVersion);
    jest.spyOn(prisma.option, "findMany").mockResolvedValue(mockOptions);

    const response = await request(app)
      .post(`/api/versions/${versionId}/calculate`)
      .send({ selectedOptionIds: selectedIds });

    const expectedTotalPrice = new FakeDecimal("134000.00")
      .plus(new FakeDecimal("1704.00"))
      .plus(new FakeDecimal("1900.00"));
    expect(response.status).toBe(200);
    expect(response.body.totalPrice).toBe(expectedTotalPrice.toFixed(2));
  });
  it("should return 404 if version does not exist", async () => {
    prisma.version.findUnique.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/versions/non-existent-id/calculate")
      .send({ selectedOptionIds: [] });

    expect(response.status).toBe(404);
    expect(response.body.error).toContain("not found");
  });
});
