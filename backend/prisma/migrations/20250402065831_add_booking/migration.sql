/*
  Warnings:

  - Added the required column `price` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'PENDING';
