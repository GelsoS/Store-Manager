const { expect } = require('chai');
const sinon = require('sinon')
const connection = require('../../../src/models/connection')
const model = require('../../../src/models/products.model')

const products = require('./mocks/products.model')

describe('testes de unidade de Model de produtos', function () {
  afterEach(sinon.restore)

  it('operacao buscar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products])
    const result = await model.listProducts()
    expect(result).to.be.deep.equal(products)
  })

  it('recuperando produto pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([products[0]])
    const result = await model.productId(1)
    expect(result).to.be.deep.equal(products[0])
  })
})