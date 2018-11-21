import { isFuntion, isPromise } from './validation'

export const handleCallAction = (action: any, ...params: any[]): any => {
  if (isFuntion(action)) return action(...params)
  if (isPromise(action)) return action

  throw new Error('action must be function or promise instance.')
}