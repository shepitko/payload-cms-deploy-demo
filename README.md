# Payload CMS Docker Starter

Minimal but production-leaning local development setup for Payload CMS with PostgreSQL.

## What this includes

- `app` service running Payload on top of Next.js
- `postgres` service with a persistent named volume
- environment-driven configuration
- local media storage mounted as a named volume
- basic health checks for both containers

## Project structure

```text
.
├── Dockerfile
├── docker-compose.yml
├── src/
│   ├── app/
│   ├── collections/
│   └── payload.config.ts
└── .env.example
```

## Local run

1. Create your env file:

   ```bash
   cp .env.example .env
   ```

2. Set real secrets in `.env`:

   - `PAYLOAD_SECRET`
   - `POSTGRES_PASSWORD`

3. Start everything:

   ```bash
   docker compose up --build
   ```

4. Open:

   - app: `http://localhost:3000`
   - admin: `http://localhost:3000/admin`
   - health: `http://localhost:3000/api/health`

If there is no admin user yet, Payload will prompt you to create the first one in the admin UI.

## Environment model

Payload prefers `DATABASE_URL`, but the app can also derive that value from `POSTGRES_*` variables. In Docker Compose, `DATABASE_URL` is passed explicitly. In CI or DigitalOcean later, you can either keep using a single connection string or inject the same component variables and let the config assemble them.

## Migrations and schema changes

For a small local dev setup, the main flow is to start the stack and work from there. If you begin managing schema changes through Payload migrations later, run commands inside the app container:

```bash
docker compose exec app npm run payload migrate:create
docker compose exec app npm run payload migrate
```

You can also generate updated types when needed:

```bash
docker compose exec app npm run payload generate:types
```

## Media storage

Media currently uses local disk storage via the `media` collection and the `media` named volume. That keeps local development simple while isolating storage concerns in one place. When you move to S3 or DigitalOcean Spaces later, replace the local upload configuration in `src/collections/Media.ts` and add the corresponding adapter package and environment variables.

## Notes for deployment later

- App Platform: build the same app image, inject managed Postgres credentials as env vars, and replace local media storage with Spaces or S3.
- Droplet: keep Docker Compose, add a reverse proxy, TLS, backups, and a remote object store for media.
