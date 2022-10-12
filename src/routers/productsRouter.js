const express = require('express');
const productsController = require('../controllers/productsController');

const routerProducts = express.Router();

routerProducts.get('/', productsController.listProducts);
routerProducts.get('/:id', productsController.productId);
routerProducts.post('/', productsController.cadastro);

module.exports = routerProducts;