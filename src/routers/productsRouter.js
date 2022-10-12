const express = require('express');
const productsController = require('../controllers/productsController');

const routerProducts = express.Router();

routerProducts.get('/', productsController.listProducts);
routerProducts.get('/:id', productsController.productId);

module.exports = routerProducts;