CREATE TABLE IF NOT EXISTS rsvp (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  attending   BOOLEAN     NOT NULL,
  guest_count SMALLINT    NOT NULL DEFAULT 1,
  message     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS rsvp_created_at_idx ON rsvp (created_at DESC);
