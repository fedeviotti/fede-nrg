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

  const rockrider = await prisma.vehicles.create({
    data: {
      name: "Rockrider ST 540",
      description: "MTB",
      typeId: bike.id,
    },
  });

  const elops = await prisma.vehicles.create({
    data: {
      name: "Elops",
      description: "City bike",
      typeId: bike.id,
    },
  });

  console.log({
    bike, car, rockrider, elops,
  });
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
