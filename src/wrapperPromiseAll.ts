import { handleCallAction } from './helper/utils'
import { isFuntion, isPromiseInstance } from './helper/validation'
import { TWithResolveAction } from './ts'

interface ITrigger {
  countSuccess: number,
  result: any[],
  error: any[],
  maxTrigger: number,
}

const validateParams = (params: any[]) => {
  if (!params.every((param) => Array.isArray(param) || param === undefined )) {
    throw new Error('element in params must be array or undefined.')
  }
}

const validationFunc = (actions: TWithResolveAction[]) => {
  if (!(actions instanceof Array)) throw new Error('actions must be array.')
  if (actions.length === 0) throw new Error('actions must not empty.')
  if (!actions.every(f => isFuntion(f) || isPromiseInstance(f) )) {
    throw new Error('element in actions must be function or promise instance.')
  }
}

export default (actions: TWithResolveAction[], params: any[]): Promise<[any[], any[]]> => {
  validationFunc(actions)

  return new Promise((resolve) => {
    if (params.length > 0) validateParams(params)

    const trigger: ITrigger = {
      countSuccess: 0,
      error: [],
      maxTrigger: actions.length,
      result: [],
    }

    const done = (i: number, error: any, result: any) => {
      trigger.countSuccess += 1
      trigger.error[i] = error
      trigger.result[i] = result

      if (trigger.countSuccess === trigger.maxTrigger) {
        resolve([trigger.error, trigger.result])
      }
    }

    const asyncCall = (func: TWithResolveAction, i: number) => {
      const param = params[i] !== undefined ? params[i] : []
      handleCallAction(func, ...param)
        .then(result => done(i, null, result))
        .catch(error => done(i, error, null))
    }

    actions.forEach((func, i) => asyncCall(func, i))
  })
}
