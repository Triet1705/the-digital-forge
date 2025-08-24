/*
  Warnings:

  - Changed the column `fuelType` on the `Car` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "fuelType" TYPE "FuelType"[] USING ARRAY["fuelType"];
