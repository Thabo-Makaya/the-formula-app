
import type { NextApiRequest, NextApiResponse } from 'next'
import { calculatePerformanceFee } from 'packages/pricing/pricingCalculator'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }
  try {
    const { monthlyRevenue, audienceSize, durationHrs, regionFactor } = req.body
    if (
      typeof monthlyRevenue !== "number" ||
      typeof audienceSize !== "number" ||
      typeof durationHrs !== "number"
    ) {
      return res.status(400).json({ error: "Missing/invalid parameters" })
    }
    const result = calculatePerformanceFee({ monthlyRevenue, audienceSize, durationHrs, regionFactor })
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Server error" })
  }
}
