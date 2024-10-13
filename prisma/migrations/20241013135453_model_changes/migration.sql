/*
  Warnings:

  - Added the required column `updatedAt` to the `Webtoon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Webtoon" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
