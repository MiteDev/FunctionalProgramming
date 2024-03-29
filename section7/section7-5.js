const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);




const reduce = curry((func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const it of iter) {
        acc = func(acc, it);
    }
    return acc;
})

const go = (...args) => reduce((a, f) => f(a), args);


const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const hasIterator = iter => iter && iter[Symbol.iterator];

const L = {
    filter: curry(function* (func, iter) {
        for (const it of iter)
            if (func(it))
                yield it;
    }),
    map: curry(function* (func, iter) {
        for (const it of iter) {
            yield func(it);
        }
    }),
    range: function* (limit) {
        let i = -1;
        while (++i < limit) {
            yield i;
        }
    },
    // flatten: function *(iter) {
    //     for(const it of iter) {
    //         if(hasIterator(it)) 
    //             for(const i of it)
    //                 yield i; 
    //         else 
    //             yield it;
    //     }
    // }
    flatten: function* (iter) {
        for (const it of iter) {
            if (hasIterator(it)) yield* it;
            else yield it;
        }
    },
    deepFlat: function* f(iter) {
        for (const it of iter) {
            if (hasIterator(it)) yield* f(it);
            else yield it;
        }
    }
}

L.flatMap = pipe(L.map, L.flatten);


const take = curry((limit, iter) => {
    const res = [];
    for (const it of iter) {
        res.push(it);
        if (limit === res.length) return res;
    }
    return res;
});

const map = curry(pipe(
    L.map,
    take(Infinity)
));

const filter = pipe(
    L.filter,
    take(Infinity)
)

const flatten = pipe(
    L.flatten,
    take(Infinity)
)

const deepFlat = pipe(
    L.deepFlat,
    take(Infinity)
)

const flatMap = pipe(
    L.map,
    flatten
)

// console.log(map(a => a + 10, L.range(4)));
// console.log(filter(a => a % 2, L.range(10)));
// console.log(flatten([1, 2, [3, 4], 5, [6, 7, 8, 9], 10, 11, [12, [13, [14], 15, [16, 17]]]]));
// console.log(take(3, L.flatten([1, 2, [3, 4], 5, [6, 7, 8, 9], 10, 11, [12, [13, [14]]]])));
// console.log(deepFlat([1, 2, [3, 4], 5, [6, 7, 8, 9], 10, 11, [12, [13, [14], 15, [16, 17]]]]));
// console.log(...L.flatMap(a => [a * 2], [[1, 2], [3], [5]]));
console.log(flatMap(L.range, [1, 2, 3]));

const arr = [
    [1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10]
];

const add = (a, b) => a + b

console.time();
go(
    arr,
    L.flatten,
    L.filter(a => a % 2),
    take(3),
    L.map(a => a * a),
    reduce((a, b) => a + b),
    console.log
)
console.timeEnd();

console.time();
go(
    arr,
    L.flatten,
    L.filter(a => a % 2),
    L.map(a => a * a),
    take(3),
    reduce((a, b) => a + b),
    console.log
)
console.timeEnd();

console.time();
go(
    arr,
    L.flatten,
    take(3),
    L.filter(a => a % 2),
    L.map(a => a * a),

    reduce((a, b) => a + b),
    console.log
)
console.timeEnd();