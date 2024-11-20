/*
  Warnings:

  - Added the required column `coins` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coins" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Prizes" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Prizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prizes" ADD CONSTRAINT "Prizes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
