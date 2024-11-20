/*
  Warnings:

  - You are about to drop the `Prizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prizes" DROP CONSTRAINT "Prizes_authorId_fkey";

-- DropTable
DROP TABLE "Prizes";

-- CreateTable
CREATE TABLE "Awards" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Awards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Awards" ADD CONSTRAINT "Awards_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
