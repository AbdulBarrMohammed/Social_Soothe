/*
  Warnings:

  - Added the required column `done` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flower" ADD COLUMN     "done" BOOLEAN NOT NULL;
