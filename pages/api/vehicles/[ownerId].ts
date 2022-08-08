import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { ownerId }: { ownerId?: string } = req.query;
  const vehicles = await prisma.vehicles.findMany({
    where: {
      ownerId,
    },
  });
  res.json(vehicles);
}
