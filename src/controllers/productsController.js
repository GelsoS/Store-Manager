const service = require('../services/products.service');

const listProducts = async (_req, res) => {
  const result = await service.listProducts();
  return res.status(200).json(result);
};

const productId = async (req, res) => {
  const { id } = req.params;
  const result = await service.productId(id);
  if (result.status) return res.status(result.status).json({ message: 'Product not found' });
  res.status(200).json(result);
};

const cadastro = async (req, res) => {
  const { name } = req.body;
  const result = await service.cadastrarProduto(name);
  if (result.status) return res.status(result.status).json({ message: result.message });
  res.status(201).json({ id: result.insertId, name });
};

const update = async (req, res) => {
  const { params: { id }, body: { name } } = req;
  const { status, message } = await service.updateId(+id, name);
  res.status(status).json(message);
};

const del = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await service.delId(+id);
  res.status(status).json(message);
};

module.exports = {
  listProducts,
  productId,
  cadastro,
  update,
  del,
};