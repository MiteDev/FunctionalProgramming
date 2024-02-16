const map = (func, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(func(a));
    }
    return res;
}

function* gen() {
    yield 1;
    if (false) yield 2;
    yield 3;
}

console.log(map(a => a, gen()));
