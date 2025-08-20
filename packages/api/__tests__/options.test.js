const { prismaMock } = require("./lib/prismaMock");
const request = require("supertest");
const app = require("../server");
const cloudinary = require("../config/cloudinary");

jest.mock("../middleware/authMiddleware", () => ({
  authMiddleware: jest.fn((req, res, next) => {
    req.user = { userId: "fake-admin-id", roles: ["ADMIN", "USER"] };
    next();
  }),
  authorize: jest.fn((roles) => (req, res, next) => {
    next();
  }),
}));

jest.mock("../config/cloudinary");

describe("Option API Routes", () => {
  describe("POST /api/options", () => {
    it("should create a new option with an image and return 201", async () => {
      const newOptionData = {
        name: "Test Wheel",
        price: "2500",
        categoryId: "cat-wheel-id",
        sku: "WHL-TEST-1",
      };

      cloudinary.uploader.upload_stream = jest.fn((options, callback) => {
        callback(null, { secure_url: "https://fake.cloudinary.url/image.jpg" });
        return { end: jest.fn() };
      });

      const expectedOption = {
        id: "new-option-id",
        ...newOptionData,
        price: 2500,
        swatchImageUrl: "https://fake.cloudinary.url/image.jpg",
      };
      prismaMock.option.create.mockResolvedValue(expectedOption);

      const response = await request(app)
        .post("/api/options")
        .field("name", newOptionData.name)
        .field("price", newOptionData.price)
        .field("categoryId", newOptionData.categoryId)
        .field("sku", newOptionData.sku)
        .attach(
          "swatchImage",
          Buffer.from("fake image data"),
          "test-image.jpg"
        );

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(newOptionData.name);
      expect(response.body.swatchImageUrl).toBe(
        "https://fake.cloudinary.url/image.jpg"
      );
    });
  });
});
