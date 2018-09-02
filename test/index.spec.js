import { expect } from 'chai'
import withResolve from '../dist'

const SUCCESS_RESPONSE = 'SUCCESS_RESPONSE'
const ERROR_RESPONSE = 'ERROR_RESPONSE'

describe('withResolve', () => {
  it('withResolve can use with function (without error)', async () => {
    const fnSuccess = () => SUCCESS_RESPONSE
    const [error, result] = await withResolve(fnSuccess)()

    expect(error).to.be.null
    expect(result).to.equal(SUCCESS_RESPONSE)
  })

  it('withResolve can use with function (with error)', async () => {
    const fnFail = () => { throw new Error(ERROR_RESPONSE) }
    const [error, result] = await withResolve(fnFail)()

    expect(error.message).to.equal(ERROR_RESPONSE)
    expect(result).to.be.undefined
  })

  it('withResolve can use with promise function (without error)', async () => {
    const fnPromiseSuccess = () => new Promise((resolve) => {
      resolve(SUCCESS_RESPONSE)
    })
    const [error, result] = await withResolve(fnPromiseSuccess)()

    expect(error).to.be.null
    expect(result).to.equal(SUCCESS_RESPONSE)
  })

  it('withResolve can use with promise function (with error)', async () => {
    const fnPromiseFail = () => new Promise((_, reject) => {
      reject(new Error(ERROR_RESPONSE))
    })
    const [error, result] = await withResolve(fnPromiseFail)()

    expect(error.message).to.equal(ERROR_RESPONSE)
    expect(result).to.be.undefined
  })

  it('withResolve must throw error when first parameter is not function', async () => {
    try {
      withResolve(SUCCESS_RESPONSE)()
      expect.fail()
    } catch (error) {
      expect(error.message).to.equal('first parameter must be function.')
    }
  })

  it('withResolve can work wiht second parameter', async () => {
    const fnWithParas = (a, b, c) => `${a}-${b}-${c}`
    const [error, result] = await withResolve(fnWithParas)('1', '2', '3')

    expect(error).to.be.null
    expect(result).to.equal('1-2-3')
  })
})
