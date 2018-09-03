"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wrapperWithPromiseAll_1 = __importDefault(require("./wrapperWithPromiseAll"));
const validationFunc = (funcs) => {
    if (!(funcs instanceof Array))
        throw new Error('funcs must be array.');
    if (funcs.length === 0)
        throw new Error('funcs must not empty.');
    if (!funcs.every(f => f instanceof Function))
        throw new Error('element in funcs must be function.');
};
const wrapperWithPromise = (func, params) => {
    return new Promise(async (resolve) => {
        try {
            const result = await func(...params);
            resolve([null, result]);
        }
        catch (error) {
            resolve([error, null]);
        }
    });
};
exports.default = (...funcs) => (...params) => {
    validationFunc(funcs);
    if (funcs.length === 1) {
        return wrapperWithPromise(funcs[0], params);
    }
    return wrapperWithPromiseAll_1.default(funcs, params);
};
