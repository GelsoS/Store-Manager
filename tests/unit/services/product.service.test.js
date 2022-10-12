const { expect } = require('chai');
const sinon = require('sinon')

const { listProducts, productId } = require('../../../src/services/products.service')
const products = require('../models/mocks/products.model')
const service = require('../../../src/services/products.service')

describe('testes de unidade de Service de produtos', function () {
  it('listar todos produtos', async function () {
    sinon.stub(service, 'listProducts').resolves(products)
    const result = await listProducts()
    expect(result).to.be.deep.equal(products)
  })

  it('recuperando produto pelo ID', async function () {
    sinon.stub(service, 'productId').resolves([products[0]])
    const result = await productId(1)
    expect(result).to.be.deep.equal(products[0])
  })

  it('testando retorno status 404', async function () {
    sinon.stub(service, 'productId').resolves({ status: 404 })
    const result = await productId(10)
    expect(result).to.be.deep.equal({ status: 404 })
  })

  afterEach(sinon.restore)
})