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

# Configuração de Variáveis de Ambiente

Este projeto utiliza variáveis de ambiente para configurar as conexões com os bancos de dados PostgreSQL. Para isso, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

## Arquivo `.env`

```env
# URL de conexão com banco PostgreSQL principal
DB_URL=postgres://<usuario>:<senha>@<host>:<porta>/<nome-do-banco>

# URL de conexão com o banco do Data Warehouse
DW_URL=postgres://<usuario>:<senha>@<host>:<porta>/dw-<nome-empresa>
