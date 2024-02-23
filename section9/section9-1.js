const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const reduce = (func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    return go1(acc, function recur(acc) {
        for (const it of iter) {
            acc = func(acc, it);
            if (acc instanceof Promise)
                return acc.then(recur)
        }

        return acc;
    });
}

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const L = {
    map: curry(function* (func, iter) {
        for (const it of iter)
            yield go1(it, func);
    })
}

// const take = curry((limit, iter) => {
//     const rst = [];
//     iter = iter[Symbol.iterator]();
//     return function recur() {
//         for (const a of iter) {
//             if (a instanceof Promise)
//                 a.then(a => (rst.push(a), rst).length === limit ? rst : recur());
//             rst.push(a);
//             if (rst.length === limit)
//                 return rst;
//         }
//         return rst;
//     }()
// })

const take = curry((limit, iter) => {
    const rst = [];
    iter = iter[Symbol.iterator]();
    return function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;
            if (a instanceof Promise)
                return a.then(a => (rst.push(a), rst).length === limit ? rst : recur());
            rst.push(a);
            if (rst.length === limit)
                return rst;
        }
        return rst;
    }()
})

go(
    [Promise.resolve(1), 2, Promise.resolve(3)],
    L.map(a => a + 10),
    take(3),
    console.log
)