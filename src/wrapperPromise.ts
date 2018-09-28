export default (func: (...params: any[]) => any, params: any[]): Promise<[any, any]> => {
  return new Promise(async (resolve) => {
    try {
      const result = await func(...params)
      resolve([null, result])
    } catch (error) {
      resolve([error, null])
    }
  })
}
