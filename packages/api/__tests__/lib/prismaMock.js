const { mockDeep, mockReset } = require("jest-mock-extended");
const { PrismaClient } = require("@prisma/client");

const mockPrismaInstance = mockDeep();

jest.mock("@prisma/client", () => ({
  __esModule: true,
  PrismaClient: jest.fn(() => mockPrismaInstance),
}));

beforeEach(() => {
  mockReset(mockPrismaInstance);
});

module.exports = { prismaMock: mockPrismaInstance };
