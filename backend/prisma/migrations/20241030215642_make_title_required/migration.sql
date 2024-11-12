/*
  Warnings:

  - Added the required column `positionX` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionY` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flower" ADD COLUMN     "positionX" INTEGER NOT NULL,
ADD COLUMN     "positionY" INTEGER NOT NULL;
