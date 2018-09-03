import { expect } from 'chai'
import withResolve from '../dist'

const RESPONSE_SUCCESS = 'RESPONSE_SUCCESS'
const RESPONSE_ERROR = 'RESPONSE_ERROR'

describe('withResolve', () => {
  it('withResolve can use with function (without error)', async () => {
    const fnSuccess = () => RESPONSE_SUCCESS
    const [error, result] = await withResolve(fnSuccess)()

    expect(error).to.be.null
    expect(result).to.equal(RESPONSE_SUCCESS)
  })

  it('withResolve can use with function (with error)', async () => {
    const fnFail = () => { throw new Error(RESPONSE_ERROR) }
    const [error, result] = await withResolve(fnFail)()

    expect(error.message).to.equal(RESPONSE_ERROR)
    expect(result).to.be.undefined
  })

  it('withResolve can use with promise function (without error)', async () => {
    const fnPromiseSuccess = () => new Promise((resolve) => {
      resolve(RESPONSE_SUCCESS)
    })
    const [error, result] = await withResolve(fnPromiseSuccess)()

    expect(error).to.be.null
    expect(result).to.equal(RESPONSE_SUCCESS)
  })

  it('withResolve can use with promise function (with error)', async () => {
    const fnPromiseFail = () => new Promise((_, reject) => {
      reject(new Error(RESPONSE_ERROR))
    })
    const [error, result] = await withResolve(fnPromiseFail)()

    expect(error.message).to.equal(RESPONSE_ERROR)
    expect(result).to.be.undefined
  })

  it('withResolve must throw error when first parameter is not function', async () => {
    try {
      withResolve(RESPONSE_SUCCESS)()
      expect.fail()
    } catch (error) {
      expect(error.message).to.equal('element in funcs must be function.')
    }
  })

  it('withResolve can work wiht second parameter', async () => {
    const fnWithParas = (a, b, c) => `${a}-${b}-${c}`
    const [error, result] = await withResolve(fnWithParas)('1', '2', '3')

    expect(error).to.be.null
    expect(result).to.equal('1-2-3')
  })
})
