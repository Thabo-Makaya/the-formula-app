import React, { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePricing, PricingFormType } from "@/hooks/usePricing"
import type { PricingResult } from '../src/types'

function LabeledInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Input {...props} />
    </div>
  )
}

const formFields: Record<PricingFormType, Array<{ label: string; name: string; type?: string }>> = {
  performance: [
    { label: "Monthly Revenue (USD)", name: "monthlyRevenue", type: "number" },
    { label: "Audience Size", name: "audienceSize", type: "number" },
    { label: "Duration (Hrs)", name: "durationHrs", type: "number" },
    { label: "Region Factor", name: "regionFactor", type: "number" },
  ],
  feature: [
    { label: "Monthly Streams", name: "monthlyStreams", type: "number" },
    { label: "Collaborator Count", name: "collaboratorCount", type: "number" },
  ],
  sync: [
    { label: "Song Score", name: "songScore", type: "number" },
    { label: "Base Low ($)", name: "baseLow", type: "number" },
    { label: "Base High ($)", name: "baseHigh", type: "number" },
    { label: "Exclusivity Factor", name: "exclusivityFactor", type: "number" },
    { label: "Term Factor", name: "termFactor", type: "number" },
  ],
}

export default function PricingLab() {
  const [tab, setTab] = useState<PricingFormType>("performance")
  const { formData, setFormField, loading, error, result, submitPricing } = usePricing(tab)

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Smart Pricing Lab</h1>
      <Tabs value={tab} onValueChange={v => setTab(v as PricingFormType)}>
        <TabsList className="mb-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="feature">Feature</TabsTrigger>
          <TabsTrigger value="sync">Sync</TabsTrigger>
        </TabsList>
        {(["performance", "feature", "sync"] as PricingFormType[]).map((type) => (
          <TabsContent key={type} value={type}>
            <form
              onSubmit={e => {
                e.preventDefault()
                submitPricing()
              }}
              className="bg-white rounded shadow p-6"
            >
              {formFields[type].map(({ label, name, type }) => (
                <LabeledInput
                  key={name}
                  label={label}
                  type={type}
                  value={formData[name] ?? ""}
                  onChange={e => setFormField(name, e.target.value)}
                  step="any"
                  required={name !== "regionFactor"}
                />
              ))}
              <Button type="submit" className="mt-4 w-full" disabled={loading}>
                {loading ? "Calculating..." : "Calculate Fee"}
              </Button>
              {error && <p className="mt-3 text-red-500">{error}</p>}
              {result && (
                <div className="mt-4 p-3 border rounded bg-muted">
                  <h3 className="font-semibold">Est. Fee Range:</h3>
                  <div>
                    <b>${result.low.toLocaleString()} – ${result.high.toLocaleString()}</b>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{result.rationale}</div>
                </div>
              )}
            </form>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
