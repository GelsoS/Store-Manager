const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon')
const { expect } = chai;

chai.use(sinonChai);

const { productIdMock } = require('./mocks/product.controllerMock')
const { products } = require('../models/mocks/products.model')
const productService = require('../../../src/services/products.service')
const productsController = require('../../../src/controllers/productsController')

describe('unidade Controller de produtos', function () {

  it('listar todos produtos', async function () {
    const res = {}
    const req = {}
    const list = [products]

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(productService, 'listProducts')
      .resolves(list)

    await productsController.listProducts(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(list)
  })

  it('teste resposta ID inexistente ', async function () {
    const res = {};
    const req = { params: { id: 99 } };

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(productService, 'productId')
      .resolves({
        status: 404,
        message: "Product not found"
      })

    await productsController.productId(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: "Product not found"
    })
  })

  it('buscar produto pelo ID', async function () {
    const res = {}
    const req = {
      params: { id: 1 }
    }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(productService, 'productId')
      .resolves(productIdMock)

    await productsController.productId(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(productIdMock)
  })

  it('teste cadastrar produtos', async function () {
    const res = {};
    const req = { body: { name: 'gelson' } };

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(productService, 'cadastrarProduto')
      .resolves({
        "affectedRows": 1,
        "fieldCount": 0,
        "info": "",
        "insertId": 4,
        "serverStatus": 2,
        "warningStatus": 0,
      })

    await productsController.cadastro(req, res)
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({
      "id": 4,
      "name": "gelson"
    })
  })

  it('teste cadastrar produtos sem nome', async function () {
    const res = {};
    const req = { body: { name: '' } };

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(productService, 'cadastrarProduto')
      .resolves({
        status: 400, message: '"name" is required'
      })

    await productsController.cadastro(req, res)
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      "message": "\"name\" is required"
    })
  })

  it('Update com sucesso!', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: { name: 'gelso' } };

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(productService, 'updateId')
      .resolves({ status: 200, message: { "id": 1, "name": "gelso" } })

    await productsController.update(req, res)
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      "id": 1,
      "name": "gelso"
    })
  })

  afterEach(() => sinon.restore())
})


