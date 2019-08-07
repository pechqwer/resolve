import { TWithResolveAction } from './ts'

import wrapperPromise from './wrapperPromise'
import wrapperPromiseAll from './wrapperPromiseAll'

export function withResolveAll(...actions: TWithResolveAction[]) {
  return (...params: any[]): Promise<[any, any]> | Promise<[any[], any[]]> => {
    return wrapperPromiseAll(actions, params)
  }
}

export default function withResolve(action: TWithResolveAction) {
  return (...params: any[]): Promise<[any, any]> | Promise<[any[], any[]]> => {
    return wrapperPromise(action, params)
  }
}
