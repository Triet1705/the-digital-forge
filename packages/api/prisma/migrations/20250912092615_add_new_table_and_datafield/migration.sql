/*
  Warnings:

  - A unique constraint covering the columns `[deliveryCode]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shareableCode]` on the table `SavedConfiguration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[showroomCode]` on the table `Showroom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deliveryCode` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shareableCode` to the `SavedConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showroomCode` to the `Showroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Delivery" ADD COLUMN     "deliveryCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."SavedConfiguration" ADD COLUMN     "shareableCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Showroom" ADD COLUMN     "showroomCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "transactionId" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invoice" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "details" JSONB NOT NULL,
    "total" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contract" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "contractCode" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "signedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TestDrive" (
    "id" TEXT NOT NULL,
    "requestCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "showroomId" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestDrive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "public"."Payment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_orderId_key" ON "public"."Invoice"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "public"."Invoice"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_orderId_key" ON "public"."Contract"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_contractCode_key" ON "public"."Contract"("contractCode");

-- CreateIndex
CREATE UNIQUE INDEX "TestDrive_requestCode_key" ON "public"."TestDrive"("requestCode");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_deliveryCode_key" ON "public"."Delivery"("deliveryCode");

-- CreateIndex
CREATE UNIQUE INDEX "SavedConfiguration_shareableCode_key" ON "public"."SavedConfiguration"("shareableCode");

-- CreateIndex
CREATE UNIQUE INDEX "Showroom_showroomCode_key" ON "public"."Showroom"("showroomCode");

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."SavedConfiguration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TestDrive" ADD CONSTRAINT "TestDrive_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TestDrive" ADD CONSTRAINT "TestDrive_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "public"."Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TestDrive" ADD CONSTRAINT "TestDrive_showroomId_fkey" FOREIGN KEY ("showroomId") REFERENCES "public"."Showroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
