import { handleCallAction } from './helper/utils'
import { TWithResolveAction } from './ts'

export default (action: TWithResolveAction, params: any[]): Promise<[any, any]> => {
  return new Promise((resolve) => {
    handleCallAction(action, ...params)
      .then(result => resolve([null, result]))
      .catch(error => resolve([error, null]))
  })
}
