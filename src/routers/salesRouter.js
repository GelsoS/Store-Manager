const express = require('express');
const salesController = require('../controllers/salesController');

const sales = express.Router();

sales.post('/', salesController.cadastrarVendaController);
sales.get('/', salesController.listVendas);
sales.get('/:id', salesController.listId);
sales.delete('/:id', salesController.del);

module.exports = sales;