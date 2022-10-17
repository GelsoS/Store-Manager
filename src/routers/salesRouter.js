const express = require('express');
const salesController = require('../controllers/salesController');

const sales = express.Router();

sales.post('/', salesController.cadastrarVendaController);
sales.get('/:id', salesController.listId);
sales.get('/', salesController.listVendas);
sales.delete('/:id', salesController.del);
sales.put('/:id', salesController.update);

module.exports = sales;