/*
  Warnings:

  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ownerId` on the `vehicle` table. All the data in the column will be lost.
  - Changed the type of `id` on the `profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_ownerId_fkey";

-- AlterTable
ALTER TABLE "profile" DROP CONSTRAINT "profile_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "vehicle" DROP COLUMN "ownerId";
