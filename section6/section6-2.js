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

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) res.push(i);
    return res;
}

const L = {};
L.range = function* (l) {
    let i = 0
    while (++i < l) yield i;
}


function test(name, time, f) {
    console.time(name);
    while (time--) f();
    console.timeEnd(name);
}

const add = (a, b) => a + b;

test('range', 10, () => reduce(add, range(1000000)));
test('L.range', 10, () => reduce(add, L.range(1000000)));
