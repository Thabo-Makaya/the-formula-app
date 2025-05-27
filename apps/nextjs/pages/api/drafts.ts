
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Draft } from '../../../packages/types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.headers
  // Stub: would fetch drafts for user from DB
  const example: Draft = {
    id: "stub-draft-id",
    userId: String(userId || ""),
    tipId: "stub-tip-id",
    content: "Example draft tip content.",
    createdAt: new Date().toISOString()
  }
  res.status(200).json([example])
}
