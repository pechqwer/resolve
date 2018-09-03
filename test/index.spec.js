import { expect } from 'chai'
import withResolve from '../dist'

const RESPONSE_SUCCESS = 'RESPONSE_SUCCESS'
const RESPONSE_ERROR = 'RESPONSE_ERROR'

const fnSuccess = () => RESPONSE_SUCCESS
const fnFail = () => { throw new Error(RESPONSE_ERROR) }
const fnPromiseSuccess = () => new Promise((resolve) => {
  resolve(RESPONSE_SUCCESS)
})
const fnPromiseFail = () => new Promise((_, reject) => {
  reject(new Error(RESPONSE_ERROR))
})

describe('withResolve', () => {
  it('withResolve can use with function (without error)', async () => {
    const [error, result] = await withResolve(fnSuccess)()

    expect(error).to.be.null
    expect(result).to.equal(RESPONSE_SUCCESS)
  })

  it('withResolve can use with function (with error)', async () => {
    const [error, result] = await withResolve(fnFail)()

    expect(error.message).to.equal(RESPONSE_ERROR)
    expect(result).to.be.null
  })

  it('withResolve can use with promise function (without error)', async () => {
    const [error, result] = await withResolve(fnPromiseSuccess)()

    expect(error).to.be.null
    expect(result).to.equal(RESPONSE_SUCCESS)
  })

  it('withResolve can use with promise function (with error)', async () => {
    const [error, result] = await withResolve(fnPromiseFail)()

    expect(error.message).to.equal(RESPONSE_ERROR)
    expect(result).to.be.null
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

  /**
  * - TODO: fix Error: Timeout of 2000ms exceeded.
  *   For async tests and hooks, ensure "done()" is called;
  * - TODO: fix Error: Resolution method is overspecified.
  *   Specify a callback *or* return a Promise; not both.
  */
  it.skip('withResolve can use with multiple promise function (without error)', async () => {
    const [error, result] = await withResolve(
      fnPromiseSuccess,
      fnPromiseSuccess,
      fnPromiseSuccess,
    )()

    expect(error).to.deep.equal([null, null, null])
    expect(result).to.deep.equal([
      RESPONSE_SUCCESS,
      RESPONSE_SUCCESS,
      RESPONSE_SUCCESS,
    ])
  })

  it.skip('withResolve can use with multiple promise function (with error)', async () => {
    const [error, result] = await withResolve(
      fnPromiseSuccess,
      fnPromiseFail,
      fnPromiseFail,
    )()

    expect(error.length).to.equal(3)
    expect(error[0]).to.be.null
    expect(error[1]).to.not.be.null
    expect(error[2]).to.not.be.null
    expect(result).to.deep.equal([RESPONSE_SUCCESS, null, null])
  })
})
