exports.exportarParaDW = async (dwClient, tipoEvento, data) => {
  const documento = {
    tipo: tipoEvento,
    payload: data,
    timestamp: new Date().toISOString()
  };
  await dwClient.query('INSERT INTO f_pedidos (documento) VALUES ($1)', [documento]);
};
