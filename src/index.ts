import wrapperPromise from './wrapperPromise'
import wrapperPromiseAll from './wrapperPromiseAll'

const validationFunc = (funcs: Array<(...params: any[]) => any>) => {
  if (!(funcs instanceof Array)) throw new Error('funcs must be array.')
  if (funcs.length === 0) throw new Error('funcs must not empty.')
  if (!funcs.every(f => f instanceof Function)) throw new Error('element in funcs must be function.')
}

export default function(...funcs: Array<(...params: any[]) => any>) {
  return (...params: any[]): Promise<[any, any]> | Promise<[any[], any[]]> => {
    validationFunc(funcs)

    if (funcs.length === 1) return wrapperPromise(funcs[0], params)

    return wrapperPromiseAll(funcs, params)
  }
}
