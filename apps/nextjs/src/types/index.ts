
export type User = {
  id: string
  name?: string
  email?: string
  spotifyId?: string
  googleId?: string
  createdAt?: string
}

export type Peer = {
  id: string
  userId: string
  peerArtistId?: string
  createdAt?: string
}

export type MatrixMetric = {
  id: string
  userId: string
  incomeSource?: string
  sharePct?: number
  yoyGrowth?: number
  marginPct?: number
  fanImpactScore?: number
  bcgCategory?: string
  timestamp?: string
}

export type PricingLog = {
  id: string
  userId: string
  serviceType?: string
  recommendedLow?: number
  recommendedHigh?: number
  actualFee?: number
  createdAt?: string
}

export type Split = {
  id: string
  userId: string
  trackId?: string
  collaboratorId?: string
  sharePct?: number
}

export type Draft = {
  id: string
  userId: string
  tipId?: string
  content?: string
  createdAt?: string
}

export type Tip = {
  id: string
  tipText?: string
  createdAt?: string
}

export type MatrixMetricAgg = {
  income_source: string
  total_share_pct: number
  avg_yoy_growth: number
  avg_margin_pct: number
  avg_fan_impact_score: number
  bcg_category: string
}

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
