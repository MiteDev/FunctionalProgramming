const curry = f => {
    return (a, ..._) => {
        return _.length ? f(a, ..._) : (..._) => f(a, ..._)
    }
};

const reduce = (func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const it of iter) {
        acc = func(acc, it);
    }
    return acc;
}

const go = (...args) => reduce((a, f) => f(a), args);


const pipe = (...f) => init_v => {
    return go(init_v, ...f)
};

const map = (func, iter) => {
    const rst = [];
    for (const it of iter) rst.push(func(it))
    return rst;
}

const L = {
    filter: function* (func, iter) {
        for (const it of iter)
            if (func(it))
                yield it;
    },
    map: curry(function* (func, iter) {
        for (const it of iter) {
            yield func(it);
        }
    }),
    range: function* (limit) {
        let i = 0;
        while (++i < limit) {
            yield i;
        }
    }
}


// a(100)

// const test = L.map(a => a + 1, [100, 1000]);

// console.log(test.next())
// console.log(test.next())


// const take = (limit, iter) => {
//     const res = [];
//     for (const it of iter) {
//         res.push(it);
//         if (limit === res.length) return res;
//     }
//     return res;
// }

// console.log(L.map(a => a + 1));

// go(
//     [10],
//     L.map(a => a + 1),
// )

// const map = pipe(
//     L.map,
//     take(Infinity)
// )



// console.log(map(a => a + 10, L.range(4)));