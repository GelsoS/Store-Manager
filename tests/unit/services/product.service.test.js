const { expect } = require('chai');
const sinon = require('sinon')

const { listProducts, productId, cadastrarProduto, updateId, delId } = require('../../../src/services/products.service')
const { cadastrarMock, products } = require('../models/mocks/products.model')
const service = require('../../../src/services/products.service')
const serviceSale = require('../../../src/services/sales.service')
const { SaleDelId } = require('../../../src/services/sales.service')

describe('testes de unidade de Service de produtos', function () {
  it('listar todos produtos', async function () {
    sinon.stub(service, 'listProducts').resolves(products)
    const result = await listProducts()
    expect(result).to.be.deep.equal(products)
  })

  it('recuperando produto pelo ID', async function () {
    sinon.stub(service, 'productId').resolves(products[0])
    const result = await productId(1)
    expect(result).to.be.deep.equal(products[0])
  })

  it('testando retorno status 404', async function () {
    sinon.stub(service, 'productId').resolves({ message: "Product not found", status: 404 })
    const result = await productId(100)
    expect(result).to.be.deep.equal({ message: "Product not found", status: 404 })
  })

  it('cadastrar produto', async function () {
    sinon.stub(service, 'cadastrarProduto').resolves(cadastrarMock)
    const result = await cadastrarProduto('gelso')
    expect(result).to.be.deep.equal(cadastrarMock)
  })

  it('teste erro ao cadastrar nome com menos de 5 caracteres', async function () {
    sinon.stub(service, 'cadastrarProduto').resolves({
      status: 422,
      message: '"name" length must be at least 5 characters long',
    })
    const result = await cadastrarProduto('gels')
    expect(result).to.be.deep.equal({
      status: 422,
      message: '"name" length must be at least 5 characters long',
    })
  })

  it('teste erro ao nao informar nome', async function () {
    sinon.stub(service, 'cadastrarProduto').resolves({ status: 400, message: '"name" is required' })
    const result = await cadastrarProduto('')
    expect(result).to.be.deep.equal({ status: 400, message: '"name" is required' })
  })

  it('update sem valor campo name!', async function () {
    sinon.stub(service, 'updateId').resolves({ status: 400, message: { message: '"name" is required' } })
    const result = await updateId(1, '')
    expect(result).to.be.deep.equal({ status: 400, message: { message: '"name" is required' } })
  })

  it('update campo name menos de 5 caracteres!', async function () {
    sinon.stub(service, 'updateId').resolves({ status: 422, message: { message: '"name" length must be at least 5 characters long' } })
    const result = await updateId(1, 'gel')
    expect(result).to.be.deep.equal({ status: 422, message: { message: '"name" length must be at least 5 characters long' } })
  })

  it('update com sucesso!', async function () {
    sinon.stub(service, 'updateId').resolves({
      status: 200, message: { "id": 2, "name": "gelson" }
    })
    const result = await updateId(2, 'gelson')
    expect(result).to.be.deep.equal({
      status: 200, message: { "id": 2, "name": "gelson" }
    })
  })

  it('update ID invalido!', async function () {
    sinon.stub(service, 'updateId').resolves({
      status: 404, message: { "message": "Product not found" }
    })
    const result = await updateId(20, 'gelson')
    expect(result).to.be.deep.equal({
      status: 404, message: { "message": "Product not found" }
    })
  })

  it('deletar produto pelo id', async function () {
    sinon.stub(service, 'delId').resolves({ status: 204 })
    const result = await delId(1)
    expect(result).to.be.deep.equal({ status: 204 })
  })

  it('deletar produto Id inexistente', async function () {
    sinon.stub(service, 'delId').resolves({ status: 404, message: { message: 'Product not found' } })
    const result = await delId(10)
    expect(result).to.be.deep.equal({ status: 404, message: { message: 'Product not found' } })
  })

  it('deletar Sale Id inexistente', async function () {
    sinon.stub(serviceSale, 'SaleDelId').resolves({ status: 404, message: { message: 'Sale not found' } })
    const result = await SaleDelId(10)
    expect(result).to.be.deep.equal({ status: 404, message: { message: 'Sale not found' } })
  })

  afterEach(sinon.restore)
})