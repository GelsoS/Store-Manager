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
  const ret = await Promise.all(resposta);

  if (ret) return { status: 201, message: { id, itemsSold: venda } };
};

module.exports = cadastrarVenda; 