const model = require('../models/products.model');

const listProducts = async () => {
  const result = await model.listProducts();
  return result;
};

const productId = async (id) => {
  const [result] = await model.productId(id);
  if (!result) return { status: 404 };
  return result;
};

const cadastrarProduto = async (nome) => {
  const [result] = await model.insert(nome);
  return result;
};

module.exports = {
  listProducts,
  productId,
  cadastrarProduto,
};