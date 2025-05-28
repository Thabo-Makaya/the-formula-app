
import type { NextApiRequest, NextApiResponse } from 'next'
import { calculateFeatureFee } from 'packages/pricing/pricingCalculator'
import type { FeatureFeeParams } from '../../../src/types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  try {
    const { monthlyStreams, collaboratorCount } = req.body
    if (
      typeof monthlyStreams !== "number" ||
      typeof collaboratorCount !== "number"
    ) {
      return res.status(400).json({ error: "Missing/invalid parameters" })
    }
    const result = calculateFeatureFee({ monthlyStreams, collaboratorCount })
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Server error" })
  }
}
