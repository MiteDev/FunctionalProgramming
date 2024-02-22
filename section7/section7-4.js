const users = [
    { age: 32 },
    { age: 31 },
    { age: 21 },
    { age: 50 },
    { age: 23 },
    { age: 10 },
    { age: 46 },
    { age: 40 },

];

const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = (func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const it of iter)
        acc = func(acc, it);

    return acc;
}

const filter = curry((func, iter) => {
    const res = [];
    for (const it of iter)
        if (func(it)) {
            res.push(it);
        }
    return res;
})

const L = {
    filter: curry(function* (func, iter) {
        for (const it of iter) {
            if (func(it))
                yield it;
        }
    })
}

const go = (...args) => reduce((a, f) => f(a), args);

const take = curry((limit, iter) => {
    let i = -1;
    const res = []
    for (const it of iter) {
        res.push(it);
        if (res.length === limit) return res;
    }
    return res;
})

const find = (func, iter) =>
    go(
        iter,
        L.filter(func),
        take(1),
        ([a]) => a
    )


console.log(find(u => u.age < 30, users));
