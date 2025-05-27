
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST") {
    // Stub: would process split payload
    res.status(200).json({ message: "Splits processed (stub)." })
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
