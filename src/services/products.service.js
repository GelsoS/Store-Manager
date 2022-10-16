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

const updateId = async (id, name) => {
  if (!name) return { status: 400, message: { message: '"name" is required' } };
  if (name.length < 5) {
    return {
      status: 422,
      message: {
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  const [result] = await model.updateM(id, name);
  if (result.changedRows === 0) return { status: 404, message: { message: 'Product not found' } };
  return { status: 200, message: { id, name } };
};

const delId = async (id) => {
  const [result] = await model.deleteId(id);
  if (result.affectedRows === 1) return { status: 204 };
  return { status: 404, message: { message: 'Product not found' } };
};

module.exports = {
  listProducts,
  productId,
  cadastrarProduto,
  updateId,
  delId,
};