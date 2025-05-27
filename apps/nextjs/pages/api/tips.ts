
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST") {
    // Stub: reply to user tip/question payload
    res.status(200).json({ tip: "Build your network and always get splits in writing. (stub)" })
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
