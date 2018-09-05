const validateParams = (limit: number, params: any[]) => {
  if (params.length !== limit) {
    throw new Error('element in params must be equal element in funcs or empty.')
  }
  if (!params.every((param) => param instanceof Array)) {
    throw new Error('element in params must be array.')
  }
}

export default (funcs: Array<(...params: any[]) => any>, params: any[]) => {
  return new Promise((resolve) => {
    if (params.length > 0) validateParams(funcs.length, params)

    interface ITrigger {
      countSuccess: number,
      result: any[],
      error: any[],
    }

    const trigger: ITrigger = {
      countSuccess: 0,
      error: [],
      result: [],
    }

    const maxTrigger: number = funcs.length

    const done = (i: number, error: any, result: any = null) => {
      trigger.countSuccess += 1
      trigger.error[i] = error
      trigger.result[i] = result

      if (trigger.countSuccess === maxTrigger) {
        resolve([trigger.error, trigger.result])
      }
    }

    const asyncCall = async (func: (...params: any[]) => any, i: number) => {
      try {
        const param = params.length > 0 ? params[i] : []
        const result = await func(...param)
        done(i, null, result)
      } catch (error) {
        done(i, error)
      }
    }

    funcs.map((func, i) => asyncCall(func, i))
  })
}
