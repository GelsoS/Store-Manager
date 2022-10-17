const { cadastrarVenda, listarVendas, listarId, SaleDelId,
  updateSales } = require('../services/sales.service');

const cadastrarVendaController = async (req, res) => {
  const { status, message } = await cadastrarVenda(req.body);
  if (status !== 201) return res.status(status).json({ message });
  res.status(201).json(message);
};

const listVendas = async (_req, res) => {
  const result = await listarVendas();
  res.status(200).json(result);
};

const listId = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await listarId(+id);
  res.status(status).json(message);
};

const del = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await SaleDelId(+id);
  res.status(status).json(message);
};

const update = async (req, res) => {
  const { params: { id }, body } = req;
  const { status, message } = await updateSales(+id, body);
  if (message.saleId) return res.status(status).json(message);
  res.status(status).json({ message });
};

module.exports = {
  cadastrarVendaController,
  listVendas,
  listId,
  del,
  update,
};