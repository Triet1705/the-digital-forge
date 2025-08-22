/*
  Warnings:

  - Added the required column `category` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelType` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."FuelType" AS ENUM ('GASOLINE', 'HYBRID', 'ELECTRIC');

-- CreateEnum
CREATE TYPE "public"."CarCategory" AS ENUM ('SPORT', 'SUV', 'SEDAN');

-- CreateEnum
CREATE TYPE "public"."SelectionType" AS ENUM ('SINGLE', 'MULTIPLE');

-- AlterTable
ALTER TABLE "public"."Car" ADD COLUMN     "baseSpecs" JSONB,
ADD COLUMN     "category" "public"."CarCategory" NOT NULL,
ADD COLUMN     "fuelType" "public"."FuelType" NOT NULL,
ADD COLUMN     "showcaseImage" TEXT;

-- AlterTable
ALTER TABLE "public"."OptionCategory" ADD COLUMN     "selectionType" "public"."SelectionType" NOT NULL DEFAULT 'SINGLE';
