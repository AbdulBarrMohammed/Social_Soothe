/*
  Warnings:

  - You are about to drop the `Positions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `x` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Positions" DROP CONSTRAINT "Positions_flowerId_fkey";

-- AlterTable
ALTER TABLE "Flower" ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Positions";
