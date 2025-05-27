
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST") {
    // Stub: would read payload and return a pricing recommendation
    res.status(200).json({ recommendedLow: 50, recommendedHigh: 200, message: "Pricing calculated (stub)." })
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
