/*
  Warnings:

  - You are about to drop the column `showcaseImage` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Car" DROP COLUMN "showcaseImage",
ADD COLUMN     "imageSet" JSONB;
