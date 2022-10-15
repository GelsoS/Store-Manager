const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon')
const { expect } = chai;

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service')
const salesController = require('../../../src/controllers/salesController')
const { salesMock, salesReturn, salesMockInconsistent } = require('../models/mocks/products.model')


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

  
  afterEach(sinon.restore)
})