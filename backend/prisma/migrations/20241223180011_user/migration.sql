/*
  Warnings:

  - You are about to drop the column `currBackgroundImg` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currFont` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currBackgroundImg",
DROP COLUMN "currFont";
