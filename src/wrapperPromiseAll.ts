import { handleCallAction } from './helper/utils'

interface ITrigger {
  countSuccess: number,
  result: any[],
  error: any[],
  maxTrigger: number,
}

const validateParams = (limit: number, params: any[]) => {
  if (params.length !== limit) {
    throw new Error('element in params must be equal element in funcs or empty.')
  }
  if (!params.every((param) => param instanceof Array)) {
    throw new Error('element in params must be array.')
  }
}

export default (actions: Array<(...params: any[]) => any>, params: any[]): Promise<[any[], any[]]> => {
  return new Promise((resolve) => {
    if (params.length > 0) validateParams(actions.length, params)

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

    // TODO: check Promise instance is not have params from application
    const asyncCall = async (func: (...params: any[]) => any, i: number) => {
      try {
        const param = params.length > 0 ? params[i] : []
        // TODO: support Promise instance and function
        const result = await handleCallAction(func, ...param)

        done(i, null, result)
      } catch (error) {
        done(i, error, null)
      }
    }

    actions.map((func, i) => asyncCall(func, i))
  })
}
