import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "~/lib/initSupabaseClient";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    supabase.auth.api.setAuthCookie(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
}
