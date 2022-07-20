/*
  Warnings:

  - You are about to drop the column `picture` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "picture",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "image_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile",
ADD COLUMN     "image_id" TEXT,
ADD COLUMN     "profileUrl" TEXT;
