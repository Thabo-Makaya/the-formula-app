
export interface PerformanceFeeParams {
  monthlyRevenue: number
  audienceSize: number
  durationHrs: number
  regionFactor?: number
}

export interface FeatureFeeParams {
  monthlyStreams: number
  collaboratorCount: number
}

export interface SyncFeeParams {
  songScore: number
  baseLow: number
  baseHigh: number
  exclusivityFactor: number
  termFactor: number
}

export interface PricingResult {
  low: number
  high: number
  rationale: string
}

// These are placeholder algorithms—replace with business logic as required
export function calculatePerformanceFee(params: PerformanceFeeParams): PricingResult {
  const { monthlyRevenue, audienceSize, durationHrs, regionFactor = 1 } = params
  const base = monthlyRevenue * 0.1 + audienceSize * 2
  const low = Math.round(base * durationHrs * regionFactor)
  const high = Math.round(low * 1.7)
  const rationale = `Calculated as base (0.1×revenue + 2×audience) × hours × regionFactor (${regionFactor}).`
  return { low, high, rationale }
}

export function calculateFeatureFee(params: FeatureFeeParams): PricingResult {
  const { monthlyStreams, collaboratorCount } = params
  const base = monthlyStreams * 0.002
  const low = Math.round(base * (collaboratorCount + 1))
  const high = Math.round(low * 2)
  const rationale = `Based on 0.2% of streams × (collaborators+1).`
  return { low, high, rationale }
}

export function calculateSyncFee(params: SyncFeeParams): PricingResult {
  const { songScore, baseLow, baseHigh, exclusivityFactor, termFactor } = params
  const low = Math.round(baseLow * songScore * exclusivityFactor * termFactor)
  const high = Math.round(baseHigh * songScore * exclusivityFactor * termFactor)
  const rationale = `Base × songScore × exclusivity × term.`
  return { low, high, rationale }
}
