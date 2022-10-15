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

const createSale = async () => {
  const [ResultSetHeader] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return ResultSetHeader.insertId;
};

module.exports = { insert, createSale };