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

// Go 함수와 인자를 전달해서 즉시 어떤 값을 평가하는데 사용
const go = (...args) => reduce((a, f) => f(a), args);

// go(
//     0,
//     a => a + 1,
//     a => a + 10,
//     a => a + 100,
//     console.log
// );

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
];


go(
    map(a => a.price, products),
    prices => filter(n => n <= 20000, prices),
    prices => reduce((a, b) => a + b, prices),
    console.log
)