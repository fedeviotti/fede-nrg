/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "avatarUrl",
ADD COLUMN     "avatar_url" TEXT;
