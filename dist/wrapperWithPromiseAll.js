"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateParams = (limit, params) => {
    if (params.length !== limit) {
        throw new Error('element in params must be equal element in funcs or empty.');
    }
    if (!params.every((param) => param instanceof Array)) {
        throw new Error('element in params must be array.');
    }
};
exports.default = (funcs, params) => {
    const trigger = {
        countSuccess: 0,
        error: [],
        result: [],
    };
    return new Promise((resolve) => {
        if (params.length > 0)
            validateParams(funcs.length, params);
        const maxTrigger = funcs.length;
        const done = (i, error, result = null) => {
            trigger.countSuccess += 1;
            trigger.error[i] = error;
            trigger.result[i] = result;
            if (trigger.countSuccess === maxTrigger) {
                resolve([trigger.error, trigger.result]);
            }
        };
        const asyncCall = async (func, i) => {
            try {
                const param = params.length > 0
                    ? params[i]
                    : [];
                const result = await func(...param);
                done(i, null, result);
            }
            catch (error) {
                done(i, error);
            }
        };
        funcs.map((func, i) => asyncCall(func, i));
    });
};
