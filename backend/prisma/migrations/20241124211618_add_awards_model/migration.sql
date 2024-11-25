/*
  Warnings:

  - You are about to drop the `Awards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currBackgroundImg` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currColor` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currFont` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currSound` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Awards" DROP CONSTRAINT "Awards_authorId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currBackgroundImg" TEXT NOT NULL,
ADD COLUMN     "currColor" TEXT NOT NULL,
ADD COLUMN     "currFont" TEXT NOT NULL,
ADD COLUMN     "currSound" TEXT NOT NULL;

-- DropTable
DROP TABLE "Awards";

-- CreateTable
CREATE TABLE "Sounds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "src" TEXT,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Sounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fonts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Fonts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundImgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "BackgroundImgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorSchemes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "ColorSchemes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sounds" ADD CONSTRAINT "Sounds_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fonts" ADD CONSTRAINT "Fonts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackgroundImgs" ADD CONSTRAINT "BackgroundImgs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorSchemes" ADD CONSTRAINT "ColorSchemes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
