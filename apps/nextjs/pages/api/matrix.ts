
import type { NextApiRequest, NextApiResponse } from 'next'
import type { MatrixMetricAgg } from '../../src/types'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://urodswtgvalmdwtvcbse.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyb2Rzd3RndmFsbWR3dHZjYnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNTA1MzAsImV4cCI6MjA2MzkyNjUzMH0.I_OvAUibNsvZibark6MKuBi1qQLfjonNY4x7ktQnolg"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' })

  const userId = req.headers['x-user-id'] || req.headers['x-user-id'.toLowerCase()]
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Missing x-user-id header' })
  }

  try {
    // Supabase RPC call to the PL/pgSQL function. No direct TS inference, so cast as needed.
    const { data, error } = await supabase.rpc('calculate_matrix_metrics', { user_id: userId })
    if (error) {
      console.error('[Matrix API] Supabase error:', error)
      return res.status(500).json({ error: 'Database error: ' + error.message })
    }
    res.status(200).json((data ?? []) as MatrixMetricAgg[])
  } catch (e) {
    console.error('[Matrix API] Unexpected error:', e)
    res.status(500).json({ error: 'Unexpected server error' })
  }
}
