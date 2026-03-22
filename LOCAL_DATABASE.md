# Local Database Setup

This project uses MySQL 8.4.8 (LTS) and phpMyAdmin for local database administration. The database is managed via Docker Compose, ensuring a consistent environment across development machines.

## Services

- MySQL: `localhost:3306`
- phpMyAdmin: `http://localhost:8080`

## Credentials

- Username: `root`
- Password: "" (empty)
- Database: `portfolio`

## Start and Stop

From the repository root:

```bash
pnpm db:up
```

Stop containers:

```bash
pnpm db:down
```

Stream logs:

```bash
pnpm db:logs
```

## Drizzle

Run Drizzle Studio:

```bash
pnpm db:studio
```

`drizzle.config.ts` now reads `DATABASE_URL` from environment variables. Ensure your local env includes:

```bash
DATABASE_URL=mysql://root@localhost:3306/portfolio
```

For this monorepo, keep `DATABASE_URL` in the workspace root `.env` (or `apps/api/.env.local`) instead of `packages/database/.env.local`.

## Notes

- Host-run apps should connect to `localhost`.
- If you run app code inside Docker in the future, use the service hostname `mysql` instead of `localhost`.
- phpMyAdmin works with MySQL 8 and can still be used for tasks not currently exposed in Drizzle Studio.
