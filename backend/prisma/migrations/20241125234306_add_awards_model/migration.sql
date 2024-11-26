/*
  Warnings:

  - Added the required column `dark` to the `ColorSchemes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `light` to the `ColorSchemes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lightest` to the `ColorSchemes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medium` to the `ColorSchemes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semiDark` to the `ColorSchemes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ColorSchemes" ADD COLUMN     "dark" TEXT NOT NULL,
ADD COLUMN     "light" TEXT NOT NULL,
ADD COLUMN     "lightest" TEXT NOT NULL,
ADD COLUMN     "medium" TEXT NOT NULL,
ADD COLUMN     "semiDark" TEXT NOT NULL;
