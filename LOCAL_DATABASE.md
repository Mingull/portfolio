# Local Database Setup

MySQL 8.4.8 (LTS) + phpMyAdmin running via Docker Compose.

## Quick Start

```bash
pnpm db:up      # Start MySQL + phpMyAdmin
pnpm db:down    # Stop all services
pnpm db:logs    # Stream logs
pnpm db:studio  # Open Drizzle Studio
```

## Connection Details

| Property | Value |
|----------|-------|
| **MySQL** | `localhost:3306` |
| **phpMyAdmin** | `http://localhost:8080` |
| **Username** | `root` |
| **Password** | (empty) |
| **Database** | `portfolio` |

## Environment

Add to `.env`:

```bash
DATABASE_URL=mysql://root@localhost:3306/portfolio
```

## Compose Files

- `docker-compose.yml` — Development (passwordless root, includes phpMyAdmin)
- `docker-compose.ci.yml` — CI pipeline (password-protected root, MySQL only)

## Notes

- Apps in Docker should use hostname `mysql` instead of `localhost`
- CI uses separate compose with password authentication
- If switching between dev/CI locally, reset volumes: `docker compose down -v` + `docker compose -f docker-compose.ci.yml down -v`
