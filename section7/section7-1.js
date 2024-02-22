const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

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

const map = (func, iter) => {
    const res = [];
    for (const it of iter) res.push(func(it));
    return res;
}



const c_reduce = curry(reduce);

const join = (sep, iter) => c_reduce((a, b) => `${a}${sep}${b}`, iter);

const go = (...args) => c_reduce((a, f) => f(a), args);



const c_map = curry(map);

const c_go = curry(go);

const pipe = (f, ...funcs) => init_v => c_go(f(init_v), ...funcs);

const c_pipe = curry(pipe);

const c_join = curry(join);



const L = {
    map: curry(function* (func, iter) {
        for (const it of iter) yield func(it);
    }),
    entries: function* (obj) {
        for (const k in obj) yield [k, obj[k]];
    }
}

function* a() {
    yield 10;
    yield 20;
    yield 30;
    yield 40;
    yield 50;
    yield 60;
}

const queryStr = c_pipe(
    L.entries,
    L.map(([k, v]) => `${k}=${v}`),
    function (a) {
        console.log(a);
        return a;
    },
    c_join('&')
)

const obj = { limit: 10, offset: 10, type: 'notice' };
console.log(queryStr(obj))

console.log(c_join('-')(a()))