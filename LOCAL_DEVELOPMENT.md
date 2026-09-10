# Run RingSlot locally

## Prerequisites

- Docker Desktop
- Node.js 20 or newer

## Start the supporting services

From the repository root:

```powershell
docker compose up -d postgres redis
```

## Start the API

From `backend`:

```powershell
npm.cmd install
npm.cmd run dev
```

The API is available at `http://localhost:4000`. Check it at `http://localhost:4000/api/health`.

The account matching `SUPERADMIN_EMAIL` in `backend/.env` becomes the protected owner account when the API starts. Register that email first if the account does not exist, then restart the API and sign in again. Open the Owner Control Center at `http://localhost:3000/admin`.

The Docker services are intentionally mapped to PostgreSQL port `15432` and Redis port `16379` to avoid conflicts with existing local installations.

## Start the website

In a second terminal, from `frontend`:

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

The checked-in local environment files contain development-only values. Replace all secrets in production. Buying real numbers, sending email, and taking deposits require valid provider credentials; the public pages, registration, login, dashboard, catalog, wallet, and local database can run without them.

To verify owner/staff separation while the API is running:

```powershell
npm.cmd run smoke:access
```

## Stop the supporting services

From the backend repository folder:

```powershell
docker compose stop postgres redis
```
