/*
  Warnings:

  - You are about to drop the `BackgroundImgs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fonts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BackgroundImgs" DROP CONSTRAINT "BackgroundImgs_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ColorSchemes" DROP CONSTRAINT "ColorSchemes_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Flower" DROP CONSTRAINT "Flower_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Fonts" DROP CONSTRAINT "Fonts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Sounds" DROP CONSTRAINT "Sounds_authorId_fkey";

-- DropTable
DROP TABLE "BackgroundImgs";

-- DropTable
DROP TABLE "Fonts";

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sounds" ADD CONSTRAINT "Sounds_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorSchemes" ADD CONSTRAINT "ColorSchemes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
