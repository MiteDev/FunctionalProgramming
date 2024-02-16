const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
];

const map = (func, iter) => {
    let rst = []
    for (const i of iter) {
        rst.push(func(i));
    }
    return rst;
}

const filter = (func, iter) => {
    let rst = []
    for (const i of iter) {
        if (func(i))
            rst.push(i);
    }
    return rst;
}

const reduce = (func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const i of iter) {
        acc = func(acc, i);
    }
    return acc;
}

const add = (a, b) => a + b;
console.log(
    reduce(
        add,
        map(p => p.price,
            filter(p => p.price <= 20000, products)))
);

console.log(
    reduce(add,
        filter(n => n <= 20000,
            map(p => p.price, products)
        )
    )
);