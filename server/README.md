# Server (Node.js) — Overview

This folder contains the Node.js backend for the Smart Fridge App. It provides REST endpoints, background jobs, and any server-side logic.

## Quick start (development)

1. Install dependencies from the `server` folder:

```powershell
cd server
npm install
```

2. Run the server (if `package.json` defines a `start` or `dev` script):

```powershell
npm run dev
# or
npm start
```

3. Tests:

```powershell
npm test
```

## Folder conventions

Recommended folders under `server/` and their purpose:

- `src/` — Main source code (the runnable app). Keep runtime code here.
  - `controllers/` — Route handlers / controllers.
  - `routes/` — Express (or other) route definitions.
  - `models/` — Database models or ORM definitions.
  - `middleware/` — Express middleware (auth, logging, error handlers).
  - `services/` — Business logic and integrations (email, payment, 3rd-party APIs).
  - `utils/` — Small helper utilities and formatters.
  - `config/` — Configuration loaders, env handling, constants.
  - `jobs/` — Background jobs and scheduled tasks.
  - `validators/` — Request validation logic (schemas, Joi, etc.).

- `database/` — Migrations, seeders, and DB-related scripts.
- `bin/` — Startup executables (e.g., CLI or server bootstrap scripts).
- `scripts/` — Utility scripts for development or deployment.
- `logs/` — Log output (typically in .gitignore for production logs).
- `tests/` — Unit and integration tests for the server.
- `docs/` — Server-specific documentation, API docs, ER diagrams.

## Conventions & notes

- Keep the public API surface in `src/routes` and `src/controllers`.
- Put shared code that is not request-specific in `src/services` or `src/utils`.
- Add a `.env.example` (not containing secrets) to document required env variables.
- Include a `scripts/start.ps1` or `scripts/start.sh` if you want convenient cross-developer start helpers.

If you'd like, I can scaffold minimal starter files: `src/index.js` (Express server), a health route (`src/routes/health.js` + `src/controllers/healthController.js`), and `.env.example` — tell me which starter files to create and I'll add them.
