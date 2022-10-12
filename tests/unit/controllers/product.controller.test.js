const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon')
const { expect } = chai;

chai.use(sinonChai);

const { productIdMock, mockIdErro } = require('./mocks/product.controllerMock')
const products = require('../models/mocks/products.model')
const productService = require('../../../src/services')
const productsController = require('../../../src/controllers/productsController')

describe('testes de unidade de Controller de produtos', function () {
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


  afterEach(sinon.restore)

})