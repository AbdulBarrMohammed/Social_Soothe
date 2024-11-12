/*
  Warnings:

  - You are about to drop the column `name` on the `Flower` table. All the data in the column will be lost.
  - Added the required column `questionFive` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionFour` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionOne` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionSeven` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionSix` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionThree` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionTwo` to the `Flower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flower" DROP COLUMN "name",
ADD COLUMN     "questionFive" TEXT NOT NULL,
ADD COLUMN     "questionFour" TEXT NOT NULL,
ADD COLUMN     "questionOne" TEXT NOT NULL,
ADD COLUMN     "questionSeven" TEXT NOT NULL,
ADD COLUMN     "questionSix" TEXT NOT NULL,
ADD COLUMN     "questionThree" TEXT NOT NULL,
ADD COLUMN     "questionTwo" TEXT NOT NULL;
