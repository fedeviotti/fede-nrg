import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const bike = await prisma.vehicleTypes.create({
    data: {
      name: "bike",
      description: "Bycicle",
    },
  });
  const car = await prisma.vehicleTypes.create({
    data: {
      name: "car",
      description: "Car",
    },
  });

  console.log({ bike, car });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
