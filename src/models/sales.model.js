const connection = require('./connection');

const insert = async (venda, insertId) => {
  // const columns = Object.keys(venda)
  //   .map((key) => `${key}`)
  //   .join(', ');

  // const placeholders = Object.keys(venda)
  //   .map((_key) => '?')
  //   .join(', ');

  // const result = await connection.execute(
  //   `INSERT INTO StoreManager.sales_products (${columns}) VALUES (${placeholders})`,
  //   [...Object.values(venda)],
  // );
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)'
    + ` VALUES (${insertId},${venda.productId},${venda.quantity})`,
  );
  return result;
};

const updateSaleM = async (quantity, produtId, id) => {
  const result = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND  product_id = ?',
    [quantity, id, produtId],
  );
  return result;
};

const listSales = async () => {
  const [date] = await connection.execute(
    'SELECT d.id AS saleId, d.date, p.product_id AS productId, p.quantity FROM'
    + ' StoreManager.sales_products AS p LEFT JOIN StoreManager.sales as d ON d.id = p.sale_id',
  );
  return date;
};

const asId = async (id) => {
  const [result] = await connection.execute(
    'SELECT d.date, p.product_id AS productId, p.quantity FROM'
    + ' StoreManager.sales_products AS p LEFT JOIN StoreManager.sales as d ON d.id = p.sale_id'
    + ` WHERE d.id = ${id} ORDER BY d.id, p.product_id ASC`,
  );
  return result;
};

const createSale = async () => {
  const [ResultSetHeader] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return ResultSetHeader.insertId;
};

const deleteIdSales = async (id) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  insert,
  createSale,
  listSales,
  asId,
  deleteIdSales,
  updateSaleM,
};