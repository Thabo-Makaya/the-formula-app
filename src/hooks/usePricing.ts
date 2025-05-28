
import { useState } from "react"
import type { PricingResult, PerformanceFeeParams, FeatureFeeParams, SyncFeeParams } from '../../apps/nextjs/src/types'

export type PricingFormType = "performance" | "feature" | "sync"

const apiMap: Record<PricingFormType, string> = {
  performance: "/api/pricing/performance",
  feature: "/api/pricing/feature",
  sync: "/api/pricing/sync",
}

type FormDataType = Record<string, string | number | undefined>

export function usePricing(tab: PricingFormType) {
  const [formData, setFormData] = useState<FormDataType>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PricingResult | null>(null)

  function setFormField(name: string, value: string) {
    setFormData(prev => ({
      ...prev,
      [name]: value === "" ? undefined : isNaN(Number(value)) ? value : Number(value)
    }))
  }

  async function submitPricing() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(apiMap[tab], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Unknown error")
      } else {
        setResult(data)
      }
    } catch (e: any) {
      setError("Network error")
    }
    setLoading(false)
  }

  return { formData, setFormField, loading, error, result, submitPricing }
}
