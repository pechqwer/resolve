import { handleCallAction } from './helper/utils'
import { isFuntion, isPromiseInstance } from './helper/validation'
import { TWithResolveAction } from './ts'

const validationFunc = (action: TWithResolveAction) => {
  if (!isFuntion(action) && !isPromiseInstance(action)) {
    throw new Error('element in actions must be function or promise instance.')
  }
}

export default (action: TWithResolveAction, params: any[]): Promise<[any, any]> => {
  validationFunc(action)

  return new Promise((resolve) => {
    handleCallAction(action, ...params)
      .then(result => resolve([null, result]))
      .catch(error => resolve([error, null]))
  })
}
