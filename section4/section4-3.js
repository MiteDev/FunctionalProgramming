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
const go = (...args) => reduce((a, f) => f(a), args);
// const pipe = (f, ...fs) => (...a) => go(f(...a), ...fs);
// const pipe = (...fs) => (a) => go(a, ...fs)

const func = (a, f) => f(a);

const pipe = (f, ...funcs) => (...arg) => reduce(func, f(...arg), funcs);

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
];

const add = (a, b) => a + b;

go(
    map(a => a.price, products),
    price => filter(p => p <= 20000, price),
    price_cond => reduce(add, price_cond),
    console.log
)