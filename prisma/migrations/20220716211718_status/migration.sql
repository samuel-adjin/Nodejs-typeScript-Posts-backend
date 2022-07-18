-- CreateEnum
CREATE TYPE "Status" AS ENUM ('VIEWED', 'APPROVED', 'DISAPPROVED');

-- CreateTable
CREATE TABLE "Views" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
