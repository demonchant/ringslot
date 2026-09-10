CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  category   VARCHAR(50) NOT NULL,
  message    TEXT NOT NULL,
  ip_address VARCHAR(45),
  status     VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new','read','closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
