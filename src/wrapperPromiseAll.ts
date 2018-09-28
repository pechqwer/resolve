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

export default (funcs: Array<(...params: any[]) => any>, params: any[]): Promise<[any[], any[]]> => {
  return new Promise((resolve) => {
    if (params.length > 0) validateParams(funcs.length, params)

    const trigger: ITrigger = {
      countSuccess: 0,
      error: [],
      maxTrigger: funcs.length,
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

    const asyncCall = async (func: (...params: any[]) => any, i: number) => {
      try {
        const param = params.length > 0 ? params[i] : []
        const result = await func(...param)

        done(i, null, result)
      } catch (error) {
        done(i, error, null)
      }
    }

    funcs.map((func, i) => asyncCall(func, i))
  })
}
