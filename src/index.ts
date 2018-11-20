import { isFuntion, isPromise } from './helper/validation'
import wrapperPromise from './wrapperPromise'
import wrapperPromiseAll from './wrapperPromiseAll'

const validationFunc = (actions: Array<(...params: any[]) => any>) => {
  if (!(actions instanceof Array)) throw new Error('actions must be array.')
  if (actions.length === 0) throw new Error('actions must not empty.')
  // TODO: support Promise instance and function
  if (!actions.every(f => isFuntion(f) || isPromise(f) )) {
    throw new Error('element in actions must be function or promise instance.')
  }
}

export default function(...actions: Array<(...params: any[]) => any>) {
  return (...params: any[]): Promise<[any, any]> | Promise<[any[], any[]]> => {
    validationFunc(actions)

    if (actions.length === 1) return wrapperPromise(actions[0], params)

    return wrapperPromiseAll(actions, params)
  }
}
