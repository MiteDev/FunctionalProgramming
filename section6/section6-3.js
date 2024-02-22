const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const it of iter) acc = func(acc, it);
    return acc;
})

const go = (...args) => reduce((a, f) => f(a), args);



const take = curry((limit, iter) => {
    let res = [];
    for (const it of iter) {
        res.push(it);
        if (res.length === limit) return res;
    }
    return res;
});

const L = {};
L.range = function* (limit) {
    let i = -1;
    while (++i < limit) yield i;
}

const range = (limit) => {
    let i = -1;
    const res = [];
    while (++i < limit) res.push(i);
    return res;
}

const add = (a, b) => a + b;

console.time('');

go(
    range(1000000),
    take(5),
    reduce(add),
    console.log
)

console.timeEnd('');

console.time('');

go(
    L.range(1000000),
    take(5),
    reduce(add),
    console.log
)

console.timeEnd('');