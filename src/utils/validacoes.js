const productsService = require('../services/products.service');

const existe = (venda) => {
  for (let index = 0; index < venda.length; index += 1) {
    if (!venda[index].productId) return { status: 400, message: '"productId" is required' };
    if (!venda[index].quantity) return { status: 400, message: '"quantity" is required' };
  }
};

const limite = (venda) => {
  for (let index = 0; index < venda.length; index += 1) {
    if (venda[index].quantity < 1) {
      return {
        status: 422, message: '"quantity" must be greater than or equal to 1',
      };
    }
  }
};

const verificaId = async (venda) => {
  const resposta = venda.map((a) => productsService.productId(a.productId));
  const ret = await Promise.all(resposta);
  for (let index = 0; index < ret.length; index += 1) {
    if (ret[index].status) return ret[index];
  }
};

module.exports = {
  existe,
  limite,
  verificaId,
};