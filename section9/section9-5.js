const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const goPromise = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const nop = Symbol('nop');
const noop = () => { };
const catchNoop = ([...arr]) => {
    arr.forEach(a => a instanceof Promise ? a.catch(noop) : a)
    console.log(arr)
    return arr;
};

const head = iter => goPromise(take(1, iter), ([head]) => head);

const reduceF = (acc, a, f) =>
    a instanceof Promise ? a.then(a => f(acc, a), e => e === nop ? acc : Promise.reject(e)) : f(acc, a);

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
    })
})

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
            if (rst.length === limit)
                return rst;
        }
        return rst;
    }()
})

const L = {
    map: curry(function* (func, iter) {
        for (const it of iter)
            yield goPromise(it, func);
    }),
    filter: curry(function* (func, iter) {
        for (const it of iter) {
            const b = goPromise(it, func);
            yield b instanceof Promise ? b.then(b => b ? it : Promise.reject(nop)) : it;
        }
    })
}

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const C = {
    reduce: curry((func, acc, iter) =>
        iter ?
            reduce(func, acc, catchNoop(iter)) :
            reduce(func, catchNoop(acc))
    ),
    take: curry((limit, iter) => take(limit, catchNoop(iter))),
}


C.map = curry(pipe(L.map, C.take(Infinity)));
C.filter = curry(pipe(L.filter, C.take(Infinity)));



const delay = (a, name) => new Promise(resolve => {
    console.log(`${name}: ${a}`);
    setTimeout(() => resolve(a), 1000);
})

const add = (a, b) => a + b;
go(
    [1, 2, 3, 4],
    C.map(a => delay(a * a, 'map 1')),
    L.filter(a => delay(a % 2, 'filter 2')),
    L.map(a => delay(a + 10, 'map 3')),
    // take(2),
    C.take(2),
    // C.reduce(add),
    console.log
)