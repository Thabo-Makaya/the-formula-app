
# THE FORMULA: Music Biz Toolkit

Monorepo for THE FORMULA — a music business analytics and collaboration toolkit.

## Structure

- `/apps/nextjs` – Frontend (Next.js with stubbed API routes)
- `/apps/fastapi` – Python FastAPI microservices
- `/packages/db` – DB schema (SQL/Prisma), types
- `.github/workflows` – CI/CD for deploys

## Quickstart

- Install dependencies, run each app in `apps/*` separately.
- Edit `packages/db/schema.sql` or update Prisma as needed before provisioning Supabase.
