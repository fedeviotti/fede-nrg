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

  // Important: add manually ownerId that is created when a user is created
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

  const giant = await prisma.vehicles.create({
    data: {
      name: "Giant",
      description: "MTB Front Full Carbon",
      typeId: bike.id,
    },
  });

  const rockriderServiceOne = await prisma.services.create({
    data: {
      name: "Manutenzione pedale",
      description: "Fissaggio pedale dopo che si è staccato due volte",
      vehicleId: rockrider.id,
    },
  });

  const rockriderServiceTwo = await prisma.services.create({
    data: {
      name: "Cambio gomme",
      description: "Messo gomme tubeless",
      vehicleId: rockrider.id,
    },
  });

  const elopsService = await prisma.services.create({
    data: {
      name: "Check annuale",
      description: "Controllo annuale gratuito entro il primo anno",
      vehicleId: elops.id,
    },
  });

  console.log({
    bike,
    car,
    rockrider,
    elops,
    giant,
    rockriderServiceOne,
    rockriderServiceTwo,
    elopsService,
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
