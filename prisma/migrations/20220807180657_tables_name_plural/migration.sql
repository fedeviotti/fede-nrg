/*
  Warnings:

  - You are about to drop the column `createdAt` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `service` table. All the data in the column will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicle_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_typeId_fkey";

-- AlterTable
ALTER TABLE "service" DROP COLUMN "createdAt",
DROP COLUMN "vehicleId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "vehicle_id" INTEGER;

-- DropTable
DROP TABLE "profile";

-- DropTable
DROP TABLE "vehicle";

-- DropTable
DROP TABLE "vehicle_type";

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "is_owned" BOOLEAN NOT NULL DEFAULT true,
    "type_id" INTEGER NOT NULL,
    "owner_id" UUID,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_types" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "description" TEXT,

    CONSTRAINT "vehicle_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "email" TEXT NOT NULL,
    "username" TEXT,
    "bio" TEXT,
    "avatar_url" TEXT,
    "website" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_type_id_key" ON "vehicles"("type_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "vehicle_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
