const express = require('express');
const productsController = require('../controllers/productsController');

const routerProducts = express.Router();

routerProducts.get('/search', productsController.search);
routerProducts.get('/:id', productsController.productId);
routerProducts.get('/', productsController.listProducts);

routerProducts.post('/', productsController.cadastro);
routerProducts.put('/:id', productsController.update);
routerProducts.delete('/:id', productsController.del);

module.exports = routerProducts;