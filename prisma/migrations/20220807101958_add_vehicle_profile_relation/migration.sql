-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "ownerId" UUID;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
