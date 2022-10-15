const { cadastrarVenda } = require('../services/sales.service');

const cadastrarVendaController = async (req, res) => {
  const { status, message } = await cadastrarVenda(req.body);
  if (status !== 201) return res.status(status).json({ message });
  res.status(201).json(message);
};

module.exports = {
  cadastrarVendaController,
};