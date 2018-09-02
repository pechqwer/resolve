declare const withResolve: (func: (...params: any[]) => any) => (...params: any[]) => Promise<{}>;
export default withResolve;
