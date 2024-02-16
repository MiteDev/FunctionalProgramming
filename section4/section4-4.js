// Functional Programming은 코드를 값으로 다루는 방법을 많이 사용함


const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((func, iter) => {
    let rst = [];
    for (const i of iter) {
        rst.push(func(i));
    }
    return rst;
})

const filter = curry((func, iter) => {
    let rst = [];
    for (const i of iter) {
        if (func(i)) rst.push(i);
    }
    return rst;
})

const reduce = curry((func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const i of iter) {
        acc = func(acc, i)
    }
    return acc;
})

const go = (...args) => reduce((a, f) => f(a), args);

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
];

const add = (a, b) => a + b;

go(
    products,
    map(a => a.price),
    filter(p => p <= 20000),
    reduce(add),
    console.log
)

// curry => 함수를 받아서 함수를 return하고 인자를 받아서 원하는 만큼의 인자가 들어왔을때 받아둔 함수를 나중에 평가시키는 함수



const mult = curry((a, b) => a * b);
const mult3 = mult(3)
console.log(mult3(1));
console.log(mult3(2));
console.log(mult3(3));
console.log(mult3(4));