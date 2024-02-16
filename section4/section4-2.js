// Functional Programming은 코드를 값으로 다루는 방법을 많이 사용함


const map = (func, iter) => {
    let rst = [];
    for (const i of iter) {
        rst.push(func(i));
    }
    return rst;
}

const filter = (func, iter) => {
    let rst = [];
    for (const i of iter) {
        if (func(i)) rst.push(i);
    }
    return rst;
}

const reduce = (func, acc, iter) => {
    console.log(func)
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const i of iter) {
        acc = func(acc, i)
    }
    return acc;
}

// console.log(reduce((a, b) => a - b, [1, 2, 3]))

// Pipe => 함수들이 나열된 합성된 함수를 만드는 함수
// const go = (...args) => reduce((a, f) => f(a), args);
// const pipe = (f, ...fs) => (...a) => go(f(...a), ...fs);
// const pipe = (...fs) => (a) => go(a, ...fs)

// go(
//     console.log
// );

const func = (a, f) => f(a);

const pipe = (f, ...funcs) => (...arg) => reduce(func, f(...arg), funcs)

const p = pipe(
    (a, b) => a + b,
    a => a + 10,
    a => a + 100
);

console.log(p(0, 4, 20))