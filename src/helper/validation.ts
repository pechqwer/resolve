// import { TWithResolveAction } from '../ts'

// export const validationFunc = (actions: TWithResolveAction[]) => {
//   if (!(actions instanceof Array)) throw new Error('actions must be array.')
//   if (actions.length === 0) throw new Error('actions must not empty.')
//   if (!actions.every(f => isFuntion(f) || isPromiseInstance(f) )) {
//     throw new Error('element in actions must be function or promise instance.')
//   }
// }

export const isFuntion = (value: any): boolean => value instanceof Function

export const isPromiseInstance = (value: any): boolean => value instanceof Promise
