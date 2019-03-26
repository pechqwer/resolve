import { handleCallAction } from './helper/utils'
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

export default (actions: TWithResolveAction[], params: any[]): Promise<[any[], any[]]> => {
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

    const asyncCall = async (func: TWithResolveAction, i: number) => {
      try {
        const param = params[i] !== undefined ? params[i] : []
        const result = await handleCallAction(func, ...param)

        done(i, null, result)
      } catch (error) {
        done(i, error, null)
      }
    }

    actions.map((func, i) => asyncCall(func, i))
  })
}
