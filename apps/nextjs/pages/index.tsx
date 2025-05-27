
import type { NextPage } from 'next'

const Home: NextPage = () => (
  <main style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>THE FORMULA: Music Biz Toolkit</h1>
      <p style={{ color: "#6b7280", marginTop: "1rem" }}>Monorepo bootstrapped — Next.js, Supabase, FastAPI, CI/CD ready.</p>
    </div>
  </main>
)
export default Home
