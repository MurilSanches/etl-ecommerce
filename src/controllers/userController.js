const db = require('../database/db');
const etl = require('../etl/etlAgent');
const dw = require('../dw/dw');

const criarConta = async (req, res) => {
  const { nome, email, senha } = req.body;
  const result = await db.query(
    'INSERT INTO contas (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, senha]
  );
  await etl.exportarParaDW(dw, 'criarConta', result.rows[0]);
  res.status(201).json(result.rows[0]);
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  const result = await db.query('SELECT * FROM contas WHERE email = $1 AND senha = $2', [email, senha]);
  if (result.rows.length === 0) return res.status(401).json({ erro: 'Login inválido' });
  await etl.exportarParaDW(dw, 'login', { email, timestamp: new Date().toISOString() });
  res.json({ msg: 'Logado com sucesso' });
};

const faturarPedido = async (req, res) => {
  const { conta_id, total } = req.body;
  const pedido = await db.query(
    'INSERT INTO pedidos (conta_id, total) VALUES ($1, $2) RETURNING *',
    [conta_id, total]
  );
  await etl.exportarParaDW(dw, 'faturarPedido', pedido.rows[0]);
  res.status(201).json(pedido.rows[0]);
};


module.exports = { criarConta, login, faturarPedido }