# ICEHub database export

This folder holds a portable copy of the Supabase schema and data so you can share the project without giving someone your live Supabase credentials.

## What's here

| File / folder | Purpose |
|---------------|---------|
| `schema.sql` | Full table definitions, foreign keys, and RLS policies |
| `seed-data.sql` | `INSERT` statements generated from live data (after export) |
| `data/*.json` | One JSON file per table (good for AI agents and scripts) |
| `manifest.json` | Export timestamp and row counts |

## Export data from your Supabase project

1. Copy env template and add credentials:

```bash
cp .env.example .env
```

Fill in at minimum:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (needed to read all rows; find in Supabase → Project Settings → API)

2. Run the export:

```bash
npm run db:export
```

3. Commit or zip the repo **including** the `database/` folder before sharing.

### Options

```bash
# Omit password hashes when sharing publicly
npm run db:export -- --strip-passwords
```

If passwords are stripped, restored users can log in with the default workshop password `workshop123` (see restore API) or you can reset passwords manually.

## Restore on a new Supabase project

1. Create a new Supabase project.
2. Open **SQL Editor** and run `database/schema.sql`.
3. Run `database/seed-data.sql` in the same editor.
4. Copy `.env.example` → `.env` with the **new** project's URL and keys.
5. Start the app: `npm install && npm run dev`.

## Alternative: Supabase Dashboard backup

For a full Postgres dump (schema + data + extensions):

1. Supabase Dashboard → **Database** → **Backups**
2. Download a backup, or use **Connect** to get the Postgres connection string
3. With `pg_dump` installed locally:

```bash
pg_dump "postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres" \
  --schema=public --data-only --inserts > database/seed-data.sql
```

## Tables

| Table | Description |
|-------|-------------|
| `users` | Accounts, profiles, skills, roles |
| `teams` | Team metadata and member lists |
| `messages` | Direct messages between users |
| `team_links` | Links shared inside a team |
| `team_chats` | Team chat messages |
| `team_images` | Team gallery image metadata |
| `announcements` | Admin announcements |

## Notes for collaborators / AI agents

- App code reads Supabase via `server/utils/supabase.ts`.
- Static uploads live under `public/uploads/`; many profile/team images are external URLs (Google Drive, etc.) stored in the database.
- The admin UI also has a backup feature at `/admin/backup` that exports JSON in the same shape as `database/data/`.
