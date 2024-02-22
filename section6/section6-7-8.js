const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const take = curry((limit, iter) => {
    let res = [];
    // for (const it of iter) {
    //     res.push(it);
    //     if (res.length === limit) return res;
    // }
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(a);
        if (res.length === limit) return res;
    }
    return res;
})

const reduce = curry((func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        acc = func(acc, a);
    }
    // for (const it of iter) acc = func(acc, it);
    return acc;
})

const go = curry((...args) => reduce((a, f) => f(a), args))

// range, map, filter, take, reduce 중첩 사용

const range = limit => {
    let i = -1;
    const res = [];
    while (++i < limit)
        res.push(i);
    return res;
}

const map = curry((func, iter) => {
    const res = [];
    // for (const it of iter) res.push(func(it));
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(func(a));
    }
    return res;
})

const filter = curry((func, iter) => {
    const res = [];
    // for (const it of iter) if (func(it)) res.push(it);
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (func(a)) res.push(a);
    }
    return res;
})

console.time()
go(
    range(100000000),
    map(a => a + 10),
    filter(a => a % 2),
    take(2),
    console.log
) // => 즉시 평가 => range(10) => map(a => a + 10) => filter(a => a % 2) => take(2) => console.log
console.timeEnd()
// L.range, L.map, L.filter, take, reduce 중첩 사용

const L = {};
L.range = function* (limit) {
    let i = -1;
    while (++i < limit)
        yield i;
}

L.map = curry(function* (func, iter) {
    // for (const it of iter) yield func(it);
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        yield func(a);
    }
})

L.filter = curry(function* (func, iter) {
    // for (const it of iter) if (func(it)) yield it;
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (func(a))
            yield a;
    }
})

console.time('')
go(
    L.range(100000000000000),
    L.map(a => a + 10),
    L.filter(a => a % 2),
    take(2),
    console.log
) // => take(2) => L.filter(a => a % 2) => L.map(a => a + 10) => L.range(10) => L.map(a => a + 10) => L.filter(a => a % 2) => L.range(10) => L.map(a => a + 10) => L.filter(a => a % 2) 
// => take(2) => L.range
console.timeEnd('')
