import { TWithResolveAction } from './ts'

import wrapperPromise from './wrapperPromise'
import wrapperPromiseAll from './wrapperPromiseAll'

function withResolveAll(...actions: TWithResolveAction[]) {
  return (...params: any[]): Promise<[any, any]> | Promise<[any[], any[]]> => {
    return wrapperPromiseAll(actions, params)
  }
}

function withResolve(action: TWithResolveAction) {
  return (...params: any[]): Promise<[any, any]> | Promise<[any[], any[]]> => {
    return wrapperPromise(action, params)
  }
}

withResolve.all = withResolveAll

export {
  withResolveAll,
}

export default withResolve
