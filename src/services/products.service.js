const model = require('../models/products.model');

const listProducts = async () => {
  const result = await model.listProducts();
  return result;
};

const productId = async (id) => {
  const [result] = await model.productId(id);
  if (!result) return { status: 404, message: 'Product not found' };
  return result;
};

const cadastrarProduto = async (nome) => {
  if (!nome) return { status: 400, message: '"name" is required' };
  if (nome.length < 5) {
    return {
      status: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
  const [result] = await model.insert(nome);
  return result;
};

module.exports = {
  listProducts,
  productId,
  cadastrarProduto,
};