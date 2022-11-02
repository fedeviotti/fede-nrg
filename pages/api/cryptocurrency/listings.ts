import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=8", {
    method: "GET",
    headers: {
      "X-CMC_PRO_API_KEY": process.env.X_CMC_PRO_API_KEY || "",
    },
  });
  const result = await response.json();
  res.status(200).json(result.data);
}
