
import type { NextApiRequest, NextApiResponse } from 'next'
import { calculateSyncFee } from 'packages/pricing/pricingCalculator'
import type { SyncFeeParams } from '../../../src/types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  try {
    const { songScore, baseLow, baseHigh, exclusivityFactor, termFactor } = req.body
    if (
      typeof songScore !== "number" ||
      typeof baseLow !== "number" ||
      typeof baseHigh !== "number" ||
      typeof exclusivityFactor !== "number" ||
      typeof termFactor !== "number"
    ) {
      return res.status(400).json({ error: "Missing/invalid parameters" })
    }
    const result = calculateSyncFee({ songScore, baseLow, baseHigh, exclusivityFactor, termFactor })
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Server error" })
  }
}
