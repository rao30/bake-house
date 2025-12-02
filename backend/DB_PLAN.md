# Database plan

## Choice
- **Primary database:** PostgreSQL (managed service or container) for strong consistency, JSON support, and compatibility with Indian cloud providers.
- **Local/tests:** SQLite with the same SQLAlchemy models to keep the developer loop fast and deterministic.

## Schema (initial)
- `users`: id (string/Google sub, PK), email (unique), name, avatar, created_at.
- `tokens`: token (uuid, PK), user_id (FK to users.id), created_at, expires_at (nullable for now).
- `orders`: id (uuid PK), user_id (nullable FK), customer_json (JSON), items_json (JSON array), pickup_datetime (timestamp UTC), created_at, status (enum: pending_payment/confirmed/paid), payment_reference (nullable string).
- **Indexes:** orders.user_id + created_at for history lookup; tokens.token unique index.

## Access patterns
- Auth: upsert user on Google sign-in; store issued bearer tokens in `tokens` and resolve them per request.
- Orders: write on checkout/creation, update status on payment confirmation, list by `user_id` for order history, fetch by id for detail.

## Migrations
- Use **Alembic** to manage schema versions. Base revision creates the tables above; future revisions can normalize order items into a dedicated `order_items` table or add payment provider metadata.

## Configuration
- `DATABASE_URL` env var (e.g., `postgresql+psycopg2://user:pass@host:5432/bakehouse`).
- Fallback to `sqlite:///./app.db` for local dev; tests override with in-memory SQLite via dependency overrides.

## Reliability & integrity
- Use SQL constraints for PK/FK uniqueness; enum validation via SQLAlchemy; default timestamps from application code for portability across SQLite/Postgres.
- Keep business logic in application layer for validation (preview) and use transactions per request via FastAPI dependency.
