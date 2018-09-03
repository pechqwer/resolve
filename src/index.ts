const validationFunc = (funcs: Array<(...params: any[]) => any>) => {
  if (!(funcs instanceof Array)) throw new Error('funcs must be array')
  if (funcs.length === 0) throw new Error('funcs must not empty.')
  if (!funcs.every(f => f instanceof Function)) throw new Error('element in funcs must be function.')
}

const wrapperWithPromise = (func: (...params: any[]) => any, params: any[]) => {
  return new Promise(async (resolve) => {
    try {
      const result = await func(...params)
      resolve([null, result])
    } catch (error) {
      resolve([error])
    }
  })
}

const wrapperWithPromiseAll = (funcs: Array<(...params: any[]) => any>, params: any[]) => {
  return new Promise(async (resolve) => {
    try {
      const funcsWithParams = funcs.map((func, i) => func(params[i]))
      const result = await Promise.all(funcsWithParams)
      resolve([null, result])
    } catch (error) {
      resolve([error])
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
