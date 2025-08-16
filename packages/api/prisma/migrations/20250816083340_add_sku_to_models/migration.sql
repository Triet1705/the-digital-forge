/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Option` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Version` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sku` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Version` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Car" ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Option" ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Version" ADD COLUMN     "sku" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_sku_key" ON "public"."Car"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Option_sku_key" ON "public"."Option"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Version_sku_key" ON "public"."Version"("sku");
