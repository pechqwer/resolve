import { expect } from 'chai'
import withResolve from '../dist'

const RESPONSE_SUCCESS = 'RESPONSE_SUCCESS'
const RESPONSE_ERROR = 'RESPONSE_ERROR'

const fnWithParam = (a, b, c) => Promise.resolve(`${a}-${b}-${c}`)
const fnSuccess = () => Promise.resolve(RESPONSE_SUCCESS)
const fnPromiseSuccess = () => Promise.resolve(RESPONSE_SUCCESS)
const fnPromiseFail = () => Promise.reject(new Error(RESPONSE_ERROR))

describe('withResolve', () => {
  it('withResolve can use with function (without error)', async () => {
    const [error, result] = await withResolve(fnSuccess)()

    expect(error).to.be.null
    expect(result).to.equal(RESPONSE_SUCCESS)
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
      expect(error.message).to.equal('element in actions must be function or promise instance.')
    }
  })

  it('withResolve can work wiht second parameter', async () => {
    const [error, result] = await withResolve(fnWithParam)('1', '2', '3')

    expect(error).to.be.null
    expect(result).to.equal('1-2-3')
  })

  it('withResolve.all can use with multiple promise function (without error)', async () => {
    const [error, result] = await withResolve.all(
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

  it('withResolve.all can use with multiple promise function (with error)', async () => {
    const [error, result] = await withResolve.all(
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

  it('withResolve.all can use with multiple promise function with parameter', async () => {
    const [error, result] = await withResolve.all(
      fnWithParam,
      fnWithParam,
      fnWithParam,
    )([1, 2, 3], [4, 5, 6], [7, 8, 9])

    expect(error).to.deep.equal([null, null, null])
    expect(result.length).to.equal(3)
    expect(result[0]).to.be.equal('1-2-3')
    expect(result[1]).to.be.equal('4-5-6')
    expect(result[2]).to.be.equal('7-8-9')
  })

  it('withResolve.all must error with multiple promise function when parameters not correct format', async () => {
    try {
      await withResolve.all(
        fnWithParam,
        fnWithParam,
        fnWithParam,
      )([1, 2, 3], null, [7, 8, 9])

      expect.fail()
    } catch (error) {
      expect(error.message).to.equal('element in params must be array or undefined.')
    }
  })

  it('withResolve can work with Promise instance', async () => {
    const [error, result] = await withResolve(fnPromiseSuccess())()

    expect(error).to.be.null
    expect(result).to.equal(RESPONSE_SUCCESS)
  })

  it('withResolve.all can work with multi Promise instance', async () => {
    const [error, result] = await withResolve.all(
      fnPromiseSuccess(),
      fnPromiseFail(),
      fnPromiseFail(),
    )()

    expect(error.length).to.equal(3)
    expect(error[0]).to.be.null
    expect(error[1]).to.not.be.null
    expect(error[2]).to.not.be.null
    expect(result).to.deep.equal([RESPONSE_SUCCESS, null, null])
  })
})
