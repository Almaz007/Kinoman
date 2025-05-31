/*
  Warnings:

  - Added the required column `paymentId` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
