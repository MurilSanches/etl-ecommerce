# etl-ecommerce

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/server.js
```

This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

📦 Configuração das Variáveis de Ambiente
Antes de rodar o projeto, é necessário criar um arquivo .env na raiz do projeto com as seguintes variáveis:

env
Copiar
Editar
# Conexão com o banco de dados PostgreSQL (ex: Render, Railway, localhost)
DB_URL=postgres://<usuario>:<senha>@<host>:<porta>/<database>

# Exemplo:
# DB_URL=postgres://admin:1234@localhost:5432/ecommerce
# DW_URL=postgres://admin:1234@localhost:5432/dw-ecommerce

# (Opcional) Outras variáveis podem ser adicionadas conforme necessidade do projeto