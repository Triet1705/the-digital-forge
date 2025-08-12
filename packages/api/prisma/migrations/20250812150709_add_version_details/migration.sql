-- AlterTable
ALTER TABLE "public"."Version" ADD COLUMN     "description" TEXT,
ADD COLUMN     "detailedSpecs" JSONB,
ADD COLUMN     "galleryImages" JSONB,
ADD COLUMN     "technicalSpecImage" TEXT;
