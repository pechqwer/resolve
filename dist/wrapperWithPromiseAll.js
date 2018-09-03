"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trigger = {
    countSuccess: 0,
    error: [],
    result: [],
};
exports.default = (funcs, params) => {
    return new Promise((resolve) => {
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
                const result = await func(params[i]);
                done(i, null, result);
            }
            catch (error) {
                done(i, error);
            }
        };
        funcs.map((func, i) => asyncCall(func, i));
    });
};
