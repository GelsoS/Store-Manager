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

  const resposta = await venda.map((a) => model.insert(a, id));
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

const SaleDelId = async (id) => {
  const [result] = await model.deleteIdSales(id);
  if (result.affectedRows === 1) return { status: 204 };
  return { status: 404, message: { message: 'Sale not found' } };
};

const updateSales = async (id, body) => {
  const check = limite(body);
  if (check) return check;

  const result = existe(body);
  if (result) return result;

  const valid = await verificaId(body);
  if (valid) return valid;

  const resultado = await body
    .map(({ quantity, productId }) => model.updateSaleM(+quantity, +productId, id));
  
  const [[rest]] = await Promise.all(resultado);
  if (rest.affectedRows === 0) return { status: 404, message: 'Sale not found' };

  return { status: 200, message: { saleId: id, itemsUpdated: body } };
};

module.exports = {
  cadastrarVenda,
  listarVendas,
  listarId,
  SaleDelId,
  updateSales,
}; 