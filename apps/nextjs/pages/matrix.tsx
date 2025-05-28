import * as React from 'react'
import type { MatrixMetricAgg } from '@types'
import { useEffect, useState } from 'react'
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, ZAxis, Tooltip, Scatter, Legend } from 'recharts'

const CATEGORY_COLORS: Record<string, string> = {
  Star: '#16a34a',
  CashCow: '#0369a1',
  QuestionMark: '#eab308',
  Dog: '#a3a3a3',
}

function useMatrixMetrics(userId: string | undefined) {
  const [data, setData] = useState<MatrixMetricAgg[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    fetch('/api/matrix', { headers: { 'x-user-id': userId } })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json()
          throw new Error(error || 'Unknown error')
        }
        return res.json()
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [userId])

  return { data, loading, error }
}

export default function MatrixPage() {
  // TODO: Replace with real user ID (e.g. from auth context or cookie)
  const [userId, setUserId] = useState<string | undefined>('stub-user-id')
  const { data, loading, error } = useMatrixMetrics(userId)

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Revenue-Impact Matrix</h1>
      {/* User ID selection for demo purposes */}
      <div className="mb-4">
        <label className="mr-2">User ID:</label>
        <input
          className="border rounded px-2 py-1"
          value={userId ?? ''}
          onChange={e => setUserId(e.target.value)}
          placeholder="Set x-user-id"
        />
      </div>

      {loading && <div className="text-blue-600">Loading data…</div>}
      {error && <div className="text-red-600" role="alert">Error: {error}</div>}

      {data && data.length > 0 && (
        <>
          <section className="mb-6 overflow-x-auto">
            <table className="min-w-full border bg-white mb-4 rounded shadow text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 border">Income Source</th>
                  <th className="px-3 py-2 border">Share %</th>
                  <th className="px-3 py-2 border">YoY Growth</th>
                  <th className="px-3 py-2 border">Margin %</th>
                  <th className="px-3 py-2 border">Fan Impact</th>
                  <th className="px-3 py-2 border">BCG Category</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border px-3 py-2">{row.income_source}</td>
                    <td className="border px-3 py-2 text-right">{row.total_share_pct?.toFixed(2)}</td>
                    <td className="border px-3 py-2 text-right">{row.avg_yoy_growth?.toFixed(2)}</td>
                    <td className="border px-3 py-2 text-right">{row.avg_margin_pct?.toFixed(2)}</td>
                    <td className="border px-3 py-2 text-right">{row.avg_fan_impact_score?.toFixed(2)}</td>
                    <td className="border px-3 py-2" style={{ color: CATEGORY_COLORS[row.bcg_category] || '#333' }}>
                      {row.bcg_category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-2">Growth vs. Share Scatter Plot</h2>
            <ResponsiveContainer width="100%" minHeight={300} height={350}>
              <ScatterChart margin={{ top: 20, right: 40, bottom: 20, left: 0 }}>
                <XAxis type="number" dataKey="total_share_pct" name="Share %" tickFormatter={v => `${v}%`} />
                <YAxis type="number" dataKey="avg_yoy_growth" name="YoY Growth" tickFormatter={v => `${v}%`} />
                <ZAxis type="number" dataKey="avg_margin_pct" range={[60, 260]} name="Margin" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={value => (typeof value === 'number' ? value.toFixed(2) : value)}
                />
                {Object.keys(CATEGORY_COLORS).map(cat => (
                  <Scatter
                    key={cat}
                    name={cat}
                    data={data.filter(d => d.bcg_category === cat)}
                    fill={CATEGORY_COLORS[cat]}
                  />
                ))}
                <Legend />
              </ScatterChart>
            </ResponsiveContainer>
          </section>
        </>
      )}

      {data && data.length === 0 && <div className="text-gray-500">No data available for this user.</div>}
    </main>
  )
}
