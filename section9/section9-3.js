const goPromise = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const nop = Symbol('nop');

const reduceF = (acc, a, f) =>
    a instanceof Promise ? a.then(a => f(acc, a), e => e === nop ? acc : Promise.reject(e)) : f(acc, a);

const head = (iter) => goPromise(take(1, iter), ([head]) => head);

const reduce = curry((func, acc, iter) => {
    if (!iter) return reduce(func, head(iter = acc[Symbol.iterator]()), iter);
    iter = iter[Symbol.iterator]();

    return goPromise(acc, function recur(acc) {
        let cur;
        while (!(cur = iter.next()).done) {
            acc = reduceF(acc, cur.value, func);
            if (acc instanceof Promise) return acc.then(recur);
        }
        return acc;
    });
});

const take = curry((limit, iter) => {
    const rst = [];
    return function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const v = cur.value;
            if (v instanceof Promise)
                return v
                    .then(a => (rst.push(a), rst).length === limit ? rst : recur())
                    .catch(e => e === nop ? recur() : Promise.reject(e));
            rst.push(v);
            if (rst.length === limit) return rst;
        }
        return rst;
    }();
})


const go = (...args) => reduce((a, f) => f(a), args);

const L = {
    filter: curry(function* (func, iter) {
        for (const it of iter) {
            const b = goPromise(it, func);
            yield b instanceof Promise ? b.then(b => b ? it : Promise.reject(nop)) : it;
        }
    }),
    map: curry(function* (func, iter) {
        for (const it of iter)
            yield goPromise(it, func);
    })
}

const add = (a, b) => a + b;

go(
    [1, 2, 3, 4],
    L.map(a => a * a),
    L.filter(a => Promise.resolve(a % 2)),
    L.map(a => new Promise(resolve => setTimeout(() => resolve(a + 10), 1000))),
    take(2),
    console.log
)
