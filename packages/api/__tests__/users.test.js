const request = require("supertest");
const { prismaMock } = require("./lib/prismaMock");
const app = require("../server");

jest.mock("../middleware/authMiddleware", () => ({
  authMiddleware: jest.fn((req, res, next) => {
    req.user = { userId: "fake-admin-id", roles: ["ADMIN", "USER"] };
    next();
  }),
  authorize: jest.fn((roles) => (req, res, next) => {
    next();
  }),
}));

describe("User API Routes", () => {
  describe("GET /api/users", () => {
    it("should return a list of users for an admin", async () => {
      const mockUsers = [
        {
          id: "user-1",
          email: "admin@tdforge.com",
          firstName: "Admin",
          lastName: "User",
          roles: ["ADMIN", "USER"],
        },
        {
          id: "user-2",
          email: "test@tdforge.com",
          firstName: "Test",
          lastName: "User",
          roles: ["USER"],
        },
      ];

      prismaMock.user.findMany.mockResolvedValue(mockUsers);

      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
