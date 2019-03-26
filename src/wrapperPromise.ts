import { handleCallAction } from './helper/utils'
import { TWithResolveAction } from './ts'

export default (action: TWithResolveAction, params: any[]): Promise<[any, any]> => {
  return new Promise(async (resolve) => {
    try {
      const result = await handleCallAction(action, ...params)
      resolve([null, result])
    } catch (error) {
      resolve([error, null])
    }
  })
}
