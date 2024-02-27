const goPromise = (a, f) => a instanceof Promise ? a.then(a => f(a)) : f(a);

const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }

    return goPromise(acc, function recur(acc) {
        let cur;
        while (!(cur = iter.next()).done) {
            const v = cur.value;
            acc = func(acc, v);
            if (acc instanceof Promise) return acc.then(recur);
        }

        return acc;
    })
})

const nop = Symbol('nop');

const L = {
    filter: function* (func, iter) {
        for (const it of iter) {
            const b = goPromise(it, func);
            b.then(console.log)
            yield b instanceof Promise ? b.then(b => b ? it : Promise.reject(nop)) : it;
        }
    },
    map: function* (func, iter) {
        for (const it of iter) {
            yield goPromise(it, func);
        }
    }
}

const go = (...args) => reduce((a, f) => f(a), args);

const take = (limit, iter) => {
    const rst = [];
    iter = iter[Symbol.iterator]();
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
}

go(
    [1, 7, Promise.resolve(5), 3, 4, 11],
    a => L.map(a => Promise.resolve(a * a), a),
    a => L.filter(a => Promise.resolve(a % 2), a),
    a => L.map(a => {
        // console.log(a);
        return a * a;
    }, a),
    a => take(Infinity, a),
    console.log
)

const a = ['a', Promise.resolve('b')]
a.map(a => console.log(a))