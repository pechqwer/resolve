import { isFuntion, isPromiseInstance } from './helper/validation'
import { TWithResolveAction } from './ts'
import wrapperPromise from './wrapperPromise'
import wrapperPromiseAll from './wrapperPromiseAll'

const validationFunc = (actions: TWithResolveAction[]) => {
  if (!(actions instanceof Array)) throw new Error('actions must be array.')
  if (actions.length === 0) throw new Error('actions must not empty.')
  if (!actions.every(f => isFuntion(f) || isPromiseInstance(f) )) {
    throw new Error('element in actions must be function or promise instance.')
  }
}

export default function(...actions: TWithResolveAction[]) {
  return (...params: any[]): Promise<[any, any]> | Promise<[any[], any[]]> => {
    validationFunc(actions)

    if (actions.length === 1) return wrapperPromise(actions[0], params)

    return wrapperPromiseAll(actions, params)
  }
}
