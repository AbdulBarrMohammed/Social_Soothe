/*
  Warnings:

  - Added the required column `isChecked` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flower" ADD COLUMN     "isChecked" BOOLEAN NOT NULL;
