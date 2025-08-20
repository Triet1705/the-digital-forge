const { prismaMock } = require("./lib/prismaMock");
const app = require("../server");
const request = require("supertest");

describe("Version API Routes", () => {
  it("should return version detauls for a valid ID", async () => {
    const versionId = "carrera";
    const mockVersion = {
      id: versionId,
      name: "911 Carrera",
      description: "Great test car",
    };

    prismaMock.version.findUnique.mockResolvedValue(mockVersion);

    const response = await request(app).get(`/api/versions/${versionId}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("911 Carrera");
  });

  it("should return 404 if version ID does not exist", async () => {
    const versionId = "non-existend-id";
    prismaMock.version.findUnique.mockResolvedValue(null);

    const response = await request(app).get(`/api/versions/${versionId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toContain("not found");
  });
});

describe("GET /api/versions/:versionId/technical-details", () => {
  it("should return technicalDetails and detailedSpecs for a valid ID", async () => {
    const versionId = "carrera";
    const mockTechnicalDetails = {
      height: "1,302 mm",
      length: "4,542 mm",
    };
    const mockDetailedSpecs = {
      "Power unit": [{ label: "Number of cylinders", value: "6" }],
    };

    prismaMock.version.findUnique.mockResolvedValue({
      technicalDetails: mockTechnicalDetails,
      detailedSpecs: mockDetailedSpecs,
    });

    const response = await request(app).get(
      `/api/versions/${versionId}/technical-details`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("technicalDetails");
    expect(response.body).toHaveProperty("detailedSpecs");
    expect(response.body.detailedSpecs).toEqual(mockDetailedSpecs);
    expect(response.body.technicalDetails).toEqual(mockTechnicalDetails);
  });

  it("should return 404 if version ID does not exist for technical details", async () => {
    const versionId = "non-existent-id";
    prismaMock.version.findUnique.mockResolvedValue(null);

    const response = await request(app).get(
      `/api/versions/${versionId}/technical-details`
    );

    expect(response.status).toBe(404);
  });
});
