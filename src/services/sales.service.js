const { existe, limite, verificaId } = require('../utils/validacoes');
const model = require('../models/sales.model');

const cadastrarVenda = async (venda) => {
  const check = limite(venda);
  if (check) return check;

  const result = existe(venda);
  if (result) return result;

  const valid = await verificaId(venda);
  if (valid) return valid;

  const id = await model.createSale();

  const resposta = await venda.map((a) => model.insert(a, id)); // model.insert(a)
  await Promise.all(resposta);

  return { status: 201, message: { id, itemsSold: venda } };
};

const listarVendas = async () => {
  const sale = await model.listSales();
  return sale;
};

const listarId = async (id) => {
  const result = await model.asId(id);
  if (result.length === 0) return { status: 404, message: { message: 'Sale not found' } };
  return { status: 200, message: result };
};

module.exports = {
  cadastrarVenda,
  listarVendas,
  listarId,
}; 