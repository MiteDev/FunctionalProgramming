const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = (func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }

    return go1(acc, function recur(acc) {
        let cur;
        while (!(cur = iter.next()).done) {
            const v = cur.value;
            acc = func(acc, v);
            if (acc instanceof Promise) return acc.then(recur);
        }
        return acc;
    })
}

const go = (...args) => reduce((a, f) => f(a), args);

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const pipe = (f, ...funcs) => (...args) => go(f(...args), ...funcs);

const L = {
    map: curry(function* (func, iter) {
        for (const it of iter) {
            yield go1(it, func);
        }

    })
}

const takeFor = curry((limit, iter) => {
    const rst = [];
    iter = iter[Symbol.iterator]();
    return function recur() {
        for (const it of iter) {
            if (it instanceof Promise) {
                return it.then(a => (rst.push(a), rst).length === limit ? rst : recur());
            }
            rst.push(it);
            if (rst.length === limit)
                return rst;
        }
        return rst;
    }()
})

const take = curry((limit, iter) => {
    const rst = [];
    iter = iter[Symbol.iterator]();
    return function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;
            if (a instanceof Promise) {
                return a.then(a => (rst.push(a), rst).length === limit ? rst : recur());
            }
            rst.push(a);
            if (rst.length === limit)
                return rst;
        }
        return rst;
    }()
})

const takeAll = take(Infinity);

const map = curry(pipe(
    L.map,
    takeFor(Infinity)
));

go(
    [1, Promise.resolve(2), Promise.resolve(3)],
    // [1, 2, 3],
    // L.map(a => a + 10),
    // take(3),
    map(a => a + 10),
    console.log
)