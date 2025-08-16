-- CreateTable
CREATE TABLE "public"."OptionCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OptionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Option" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "swatchImageUrl" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OptionCategory_name_key" ON "public"."OptionCategory"("name");

-- AddForeignKey
ALTER TABLE "public"."Option" ADD CONSTRAINT "Option_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."OptionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
