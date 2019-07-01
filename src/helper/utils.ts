import { isFuntion, isPromiseInstance } from './validation'

export const handleCallAction = (action: any, ...params: any[]): Promise<any> => {
  if (isFuntion(action)) return action(...params)
  if (isPromiseInstance(action)) return action

  throw new Error('action must be function or promise instance.')
}
