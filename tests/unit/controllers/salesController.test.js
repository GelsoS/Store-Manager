const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon')
const { expect } = chai;

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service')
const salesController = require('../../../src/controllers/salesController')
const { salesMock, salesReturn, salesMockInconsistent } = require('../models/mocks/products.model')
const { sales, listarId } = require('./mocks/salesMock')


describe('unidade Controller de sales', function () {
  it('cadastrar venda com sucesso', async function () {
    const res = {}
    const req = { body: salesMock }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(salesService, 'cadastrarVenda')
      .resolves(salesReturn)

    await salesController.cadastrarVendaController(req, res)

    expect(res.status).to.have.been.calledWith(201)
    expect(res.json).to.have.been.calledWith(salesReturn)
  })

  it('valida cadastrar venda sem quantidade', async function () {
    const res = {}
    const req = { body: salesMockInconsistent }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(salesService, 'cadastrarVenda')
      .resolves({
        "message": "\"quantity\" must be greater than or equal to 1"
      })

    await salesController.cadastrarVendaController(req, res)

    expect(res.status).to.have.been.calledWith(422)
    expect(res.json).to.have.been.calledWith({
      "message": "\"quantity\" must be greater than or equal to 1"
    })
  })

  it('verefica se foram passados produtoId', async function () {
    const res = {}
    const req = {
      body: [
        {
          "quantity": 20
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(salesService, 'cadastrarVenda')
      .resolves({ "message": "\"productId\" is required" })

    await salesController.cadastrarVendaController(req, res)

    expect(res.status).to.have.been.calledWith(400)
    expect(res.json).to.have.been.calledWith({ "message": "\"productId\" is required" })
  })

  it('produto ID existe?', async function () {
    const res = {}
    const req = {
      body: [
        {
          "productId": 2,
          "quantity": 20
        },
        {
          "productId": 20,
          "quantity": 5
        }
      ]
    }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(salesService, 'cadastrarVenda')
      .resolves({ "message": "Product not found" })

    await salesController.cadastrarVendaController(req, res)

    expect(res.status).to.have.been.calledWith(404)
    expect(res.json).to.have.been.calledWith({ "message": "Product not found" })
  })

  it('listar todas vendas com sucesso', async function () {
    const res = {}
    const req = {}
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    sinon
      .stub(salesService, 'listarVendas')
      .resolves(sales)

    await salesController.listVendas(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith()
  })

  it('fitrar vendas pelo ID', async function () {
    const res = {}
    const req = {
      params: { id: 1 }
    }
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    sinon
      .stub(salesService, 'listarId')
      .resolves(listarId)

    await salesController.listId(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith()
  })

  it('verefica se o ID da venda exite', async function () {
    const res = {}
    const req = {
      params: { id: 10 }
    }
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    sinon
      .stub(salesService, 'listarId')
      .resolves({
        status: 404, message: { message: 'Sale not found' }
      })

    await salesController.listId(req, res)

    expect(res.status).to.have.been.calledWith(404)
    expect(res.json).to.have.been.calledWith({
      "message": "Sale not found"
    })
  })

  it('recuperar venda pelo ID!', async function () {
    const res = {}
    const req = {
      params: { id: 1 }
    }
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    sinon
      .stub(salesService, 'listarId')
      .resolves({
        status: 200, message: listarId
      })

    await salesController.listId(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith()
  })

  it('deletar item com sucesso!', async function () {
    const res = {}
    const req = {
      params: { id: 2 }
    }
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    sinon
      .stub(salesService, 'SaleDelId')
      .resolves({ status: 204, })

    await salesController.del(req, res)

    expect(res.status).to.have.been.calledWith(204)
  })

  afterEach(sinon.restore)
})