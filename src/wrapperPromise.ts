import { handleCallAction } from './helper/utils'

export default (action: (...params: any[]) => any, params: any[]): Promise<[any, any]> => {
  return new Promise(async (resolve) => {
    try {
      const result = await handleCallAction(action, ...params)
      resolve([null, result])
    } catch (error) {
      resolve([error, null])
    }
  })
}
