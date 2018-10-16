/**
 * Javascript ES6 functional lib
 */

!function(global) {
    /**
     * consoles
     */
    const log = console.log;
    const error = console.error;

    /**
     * Generators
     */
    function *keysIter(obj) {
        for (const k in obj) yield k;
    }

    function *valuesIter(obj) {
        for (const k in obj) yield obj[k];
    }

    function *entriesIter(obj) {
        for (const k in obj) yield [k, obj[k]];
    }

    /**
     * Assist
     */
    const hasIter = (coll) => !!coll[Symbol.iterator];
    const collIter = (coll) => hasIter(coll) ? coll[Symbol.iterator]() : valuesIter(coll);

    const identity = a => a;
    const not = a => !a;
    const noop = _ => undefined;

    const isPlainObject = coll => coll.constructor == Object;
    const isUndefined = a => a === undefined;
    const isArray = coll => Array.isArray(coll);
    const isString = a => typeof a == 'string';

    const push = (arr, v) => (arr.push(v), arr);
    const set = (obj, k, v) => (obj[k] = v, obj);

    const curry = f => (a, ..._) => isUndefined(_[0]) ? (..._) => f(a, ..._) : f(a, ..._);

    const toString = coll => coll.toString();
    const first = arr => arr[0];
    const last = arr => arr[arr.length-1];

    /**
     * collections
     */
    const reduce = curry((f, coll, acc) => {
        const iter = collIter(coll);
        acc = isUndefined(acc) ? iter.next().value : acc;
        for (const a of iter)
            acc = acc instanceof Promise ? acc.then(acc => f(acc, a)) : f(acc, a);
        return acc;
    });

    const go = (acc, ...fs) => reduce((acc, f) => f(acc), fs, acc);
    const pipe = (f, ...fs) => (..._) => reduce((acc, f) => f(acc), fs, f(..._));

    const map = curry((f, coll) => isPlainObject(coll) ?
        reduce((res, [k, a]) => go(a, f, b => set(res, k, b)), entriesIter(coll), {}) :
        reduce((res, a) => go(a, f, b => push(res, b)), coll, []));

    const filter = curry((f, coll) => isPlainObject(coll) ?
        reduce((res, [k, a]) => go(a, f, b => !!b ? set(res, k, a) : res), entriesIter(coll), {}) :
        reduce((res, a) => go(a, f, b => !!b ? push(res, a) : res), coll, []));

    const values = coll => map(identity, coll instanceof Map ? coll.values() : collIter(coll));
    const keys = coll => map(identity, coll instanceof Map ? coll.keys() : keysIter(coll));

    const findVal = curry((f, coll) => {
        const iter = collIter(coll);
        return function recur(res) {
            let cur;
            while ((cur = iter.next()) && !cur.done) {
                if ((res = f(cur.value)) !== undefined)
                    return go(res, res => res !== undefined ? res : recur());
            }
        }();
    });

    const find = curry((f, coll) => findVal(a => go(a, f, bool => bool ? a : undefined), coll));
    const none = curry(pipe(find, isUndefined));
    const some = curry(pipe(none, not));
    const every = curry((f, coll) => {
        let t = false;
        return go(find(pipe(f, not, b => (t = true, b)), coll), isUndefined, r => r && t);
    });

    const tryCatch = (tryF, args, catchF) => {
        try {
            let res = tryF(...args);
            return res instanceof Promise ? res.catch(catchF) : res;
        } catch (e) {
            return catchF(e);
        }
    };

    const negate = f => pipe(f, not);
    const reject = curry((f, coll) => filter(negate(f), coll));
    const compact = filter(identity);
    const contains = curry((list, target) => list.includes(target));

    global.ff = {
        log, error,
        identity, not, noop, negate,
        isUndefined, isArray, isPlainObject, isString,
        toString,
        first, last,
        contains,
        push, set,
        curry,
        reduce,
        map, values, keys,
        filter, reject, compact,
        go, pipe,
        tryCatch,
        findVal, find, none, some, every
    }
} (typeof window != 'undefined' ? window : global);