# RingSlot

RingSlot is a monorepo containing the public Next.js website and the private Node.js API for virtual-number activations.

## Repository structure

- `frontend/` — Next.js website and customer/owner interfaces
- `backend/` — Express API, supplier integrations, workers, and tests
- `backend/schema.sql` — PostgreSQL schema
- `render.yaml` — Render backend infrastructure blueprint
- `docker-compose.dev.yml` — local PostgreSQL and Redis services

## Local development

See [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md). Environment files, including `.env.example`, are intentionally excluded from Git.

## Deployment

- Configure Vercel with `frontend` as its Root Directory.
- Use the root `render.yaml` blueprint for the backend.
- Production deployment is manual until all credentials and end-to-end payment, email, and number-purchase tests have passed.

See [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md) before launching.
