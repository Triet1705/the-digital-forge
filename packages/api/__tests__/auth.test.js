const { prismaMock } = require("./lib/prismaMock");
const request = require("supertest");
const app = require("../server");
const bcrypt = require("bcryptjs");
const { mock } = require("jest-mock-extended");

describe("Auth API Routes", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user successfully and return 201", async () => {
      const newUserInput = {
        firstName: "Pham",
        lastName: "Minh Triet",
        email: "triet@test.com",
        password: "password123",
      };

      const expectedUser = {
        id: "some-unique-id",
        userCode: "TDF-000002",
        email: newUserInput.email,
        firstName: newUserInput.firstName,
        lastName: newUserInput.lastName,
        roles: ["USER"],
      };

      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.$transaction.mockImplementation((callback) =>
        callback(prismaMock)
      );
      prismaMock.counter.update.mockResolvedValue({ value: 2 });
      prismaMock.user.create.mockResolvedValue(expectedUser);

      const response = await request(app)
        .post("/api/auth/register")
        .send(newUserInput);

      expect(response.status).toBe(201);
      expect(response.body.email).toBe(newUserInput.email);
      expect(response.body.userCode).toBe("TDF-000002");
      expect(response.body).not.toHaveProperty("password");
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: newUserInput.email,
          password: expect.any(String),
        }),
        select: expect.any(Object),
      });
    });
    it("should return 409 conflict when email already exists", async () => {
      const existingUserInput = {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@test.com",
        password: "password123",
      };

      prismaMock.user.findUnique.mockResolvedValue({
        id: "existing-user-id",
        email: "jane.doe@test.com",
      });

      const response = await request(app)
        .post("/api/auth/register")
        .send(existingUserInput);

      expect(response.status).toBe(409);
      expect(response.body.error).toEqual("Email already exist.");

      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return 200 and a JWT when credentials are valid", async () => {
      const loginInput = {
        email: "test@tdforge.com",
        password: "password123",
      };

      const hashedPassword = await bcrypt.hash(loginInput.password, 10);
      const mockUser = {
        id: "user-id-123",
        email: loginInput.email,
        password: hashedPassword,
        roles: ["USER"],
      };

      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/api/auth/login")
        .send(loginInput);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return 401 when password is incorrect", async () => {
      const loginInput = {
        email: "test@tdforge.com",
        password: "wrongpassword",
      };

      const correctHashedPassword = await bcrypt.hash("password123", 10);
      const mockUser = {
        id: "user-id-123",
        email: loginInput.email,
        password: correctHashedPassword,
        roles: ["USER"],
      };

      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/api/auth/login")
        .send(loginInput);

      expect(response.status).toBe(401);
      expect(response.body.error).toEqual("Invalid credentials.");
    });
  });
});
