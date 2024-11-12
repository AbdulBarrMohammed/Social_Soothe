/*
  Warnings:

  - You are about to drop the column `positionX` on the `Flower` table. All the data in the column will be lost.
  - You are about to drop the column `positionY` on the `Flower` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Flower" DROP COLUMN "positionX",
DROP COLUMN "positionY";

-- CreateTable
CREATE TABLE "Positions" (
    "id" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "flowerId" TEXT NOT NULL,

    CONSTRAINT "Positions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Positions" ADD CONSTRAINT "Positions_flowerId_fkey" FOREIGN KEY ("flowerId") REFERENCES "Flower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
