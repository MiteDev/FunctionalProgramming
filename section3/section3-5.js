const reduce = (func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value
    }

    for (const it of iter) {
        acc = func(acc, it)
    }
    return acc;
}

const add = (a, b) => a + b;

console.log(reduce(add, [1, 2, 3, 4, 5]))