-- Banco transacional
CREATE TABLE contas (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  conta_id INTEGER REFERENCES contas(id),
  total NUMERIC(10,2),
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Data Warehouse
CREATE TABLE f_pedidos (
  id SERIAL PRIMARY KEY,
  documento JSONB,
  inserido_em TIMESTAMP DEFAULT NOW()
);
