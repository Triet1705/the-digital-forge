/*
  Warnings:

  - You are about to drop the column `configurationId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_configurationId_fkey";

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "configurationId";
