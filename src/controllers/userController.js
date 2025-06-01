const db = require('../database/db');
const etl = require('../etl/etlAgent');
const dw = require('../dw/dw');

const checkEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false
  }

  return true
}

const criarConta = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!checkEmail(email)) {
    return res.status(400).json({ erro: 'Email inválido.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO contas (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );

    await etl.exportarParaDW(dw, 'criarConta', result.rows[0]);

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    return res.status(500).json({ erro: 'Erro interno ao criar conta.' });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!checkEmail(email)) {
    return res.status(400).json({ erro: 'Email inválido.' });
  }

  const result = await db.query('SELECT * FROM contas WHERE email = $1 AND senha = $2', [email, senha]);
  const hasAccount = result.rows.length > 0

  await etl.exportarParaDW(dw, 'login', { email, success: hasAccount, timestamp: new Date().toISOString() });

  if (hasAccount)
    return res.json({ msg: 'Logado com sucesso' });
  res.status(401).json({ erro: 'Login inválido' });
};

const faturarPedido = async (req, res) => {
  const { conta_id, total } = req.body;

  if (!conta_id || typeof total !== 'number') {
    return res.status(400).json({ erro: 'Dados inválidos.' });
  }

  try {
    const contaExiste = await db.query(
      'SELECT 1 FROM contas WHERE id = $1',
      [conta_id]
    );

    if (contaExiste.rowCount === 0) {
      return res.status(404).json({ erro: 'Conta não encontrada.' });
    }

    const pedido = await db.query(
      'INSERT INTO pedidos (conta_id, total) VALUES ($1, $2) RETURNING *',
      [conta_id, total]
    );

    await etl.exportarParaDW(dw, 'faturarPedido', pedido.rows[0]);

    return res.status(201).json(pedido.rows[0]);
  } catch (error) {
    console.error('Erro ao faturar pedido:', error);
    return res.status(500).json({ erro: 'Erro interno ao faturar pedido.' });
  }
};



module.exports = { criarConta, login, faturarPedido }