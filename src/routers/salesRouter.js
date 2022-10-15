const express = require('express');
const salesController = require('../controllers/salesController');

const sales = express.Router();

sales.post('/', salesController.cadastrarVendaController);

module.exports = sales;