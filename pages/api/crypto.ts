// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const X_CMC_PRO_API_KEY = process.env.X_CMC_PRO_API_KEY || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": X_CMC_PRO_API_KEY,
      },
    });
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(400);
  }
}
