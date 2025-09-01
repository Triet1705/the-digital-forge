/*
  Warnings:

  - You are about to drop the column `baseSpecs` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Car" DROP COLUMN "baseSpecs";

-- AlterTable
ALTER TABLE "public"."Version" ADD COLUMN     "baseSpecs" JSONB;
