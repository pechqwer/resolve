export default (func: (...params: any[]) => any) => (...params: any[]) => {
  if (!(func instanceof Function)) throw new Error('first parameter must be function.')

  return new Promise(async (resolve) => {
    try {
      const result = await func(...params)
      resolve([null, result])
    } catch (error) {
      resolve([error])
    }
  })
}
