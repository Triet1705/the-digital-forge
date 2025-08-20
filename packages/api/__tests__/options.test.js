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

  describe("PUT /api/options/:id", () => {
    it("should update an existing option and return 200", async () => {
      const optionId = "existing-option-id";
      const updateData = {
        name: "Updated Wheel Name",
        price: "3000",
      };

      const expectedUpdatedOption = {
        id: optionId,
        sku: "WHL-TEST-1",
        name: updateData.name,
        price: 3000,
        categoryId: "cat-wheel-id",
        swatchImageUrl: "https://some.url/image.jpg",
      };

      prismaMock.option.update.mockResolvedValue(expectedUpdatedOption);

      const response = await request(app)
        .put(`/api/options/${optionId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updateData.name);
      expect(prismaMock.option.update).toHaveBeenCalledWith({
        where: { id: optionId },
        data: {
          name: updateData.name,
          price: parseFloat(updateData.price),
        },
      });
    });

    it("should return 404 if the option to update does not exist", async () => {
      const nonExistentId = "non-existent-id";
      prismaMock.option.update.mockRejectedValue(
        new Error("Record to update not found.")
      );

      const response = await request(app)
        .put(`/api/options/${nonExistentId}`)
        .send({ name: "Does not matter" });

      expect(response.status).toBe(500);
    });
  });

  describe("DELETE /api/options/:id", () => {
    it("should delete an option and return 204 status code", async () => {
      const optionId = "existing-option-id";

      prismaMock.option.delete.mockResolvedValue({ id: optionId });

      const response = await request(app).delete(`/api/options/${optionId}`);

      expect(response.status).toBe(204);
      expect(prismaMock.option.delete).toHaveBeenCalledWith({
        where: { id: optionId },
      });
    });
  });
});
