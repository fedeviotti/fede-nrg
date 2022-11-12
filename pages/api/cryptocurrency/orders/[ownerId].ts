import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { ownerId }: { ownerId?: string } = req.query;
  const orders = await prisma.young_orders.findMany({
    where: {
      owner_id: ownerId,
    },
  });
  res.json(orders);
}
