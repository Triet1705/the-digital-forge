-- CreateEnum
CREATE TYPE "public"."BodyType" AS ENUM ('COUPE', 'ROADSTER', 'CABRIOLET', 'TARGA', 'GT', 'TURBO_COUPE', 'TURBO_CABRIOLET', 'SPORT_SALOON', 'SPORT_TURISMO', 'CROSS_TURISMO', 'EXECUTIVE', 'MACAN_ELECTRIC', 'SUV');

-- CreateEnum
CREATE TYPE "public"."SeatType" AS ENUM ('TWO', 'TWO_PLUS_TWO', 'FOUR_PLUS_ONE', 'FIVE', 'FOUR');

-- AlterTable
ALTER TABLE "public"."Version" ADD COLUMN     "bodyType" "public"."BodyType"[],
ADD COLUMN     "seats" "public"."SeatType"[];
