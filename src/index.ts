import wrapperWithPromiseAll from './wrapperWithPromiseAll'

const validationFunc = (funcs: Array<(...params: any[]) => any>) => {
  if (!(funcs instanceof Array)) throw new Error('funcs must be array.')
  if (funcs.length === 0) throw new Error('funcs must not empty.')
  if (!funcs.every(f => f instanceof Function)) throw new Error('element in funcs must be function.')
}

const wrapperWithPromise = (func: (...params: any[]) => any, params: any[]) => {
  return new Promise(async (resolve) => {
    try {
      const result = await func(...params)
      resolve([null, result])
    } catch (error) {
      resolve([error, null])
    }
  })
}

export default (...funcs: Array<(...params: any[]) => any>) => (...params: any[]) => {
  validationFunc(funcs)

  if (funcs.length === 1) {
    return wrapperWithPromise(funcs[0], params)
  }

  return wrapperWithPromiseAll(funcs, params)
}
