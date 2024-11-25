/*
  Warnings:

  - Made the column `src` on table `Sounds` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sounds" ALTER COLUMN "src" SET NOT NULL;
