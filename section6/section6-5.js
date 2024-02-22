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

const map = (func, iter) => {
    const res = [];
    for (const it of iter) res.push(func(iter));
    return res;
}

const L = {};
L.map = function* (func, iter) {
    for (const it of iter) yield func(it);
}

const dong = L.map(a => a + 1, [1, 2, 3]);
console.log([...dong])

console.log(dong.next());
console.log(dong.next())
console.log(dong.next())

