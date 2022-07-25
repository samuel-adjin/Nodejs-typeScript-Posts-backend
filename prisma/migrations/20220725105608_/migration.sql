/*
  Warnings:

  - Added the required column `date` to the `Award` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Award" ADD COLUMN     "date" TEXT NOT NULL;
