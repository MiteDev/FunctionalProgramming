const map = (func, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(func(a));
    }
    return res;
}

const m = new Map();
m.set('a', 10);
m.set('b', 20);

const it = m[Symbol.iterator]();
console.log(it.next())

console.log(map(([k, v]) => [k, v * 2], m));

const n_m = new Map(map(([k, v]) => [k, v * 2], m))
