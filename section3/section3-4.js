const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
];

const under2000 = [];
for (const a of products) {
    if (a.price < 20000) under2000.push(a);
}

console.log(...under2000);

const filter = (func, iter) => {
    let arr = [];
    for (const a of iter) if (func(a)) arr.push(a)
    return arr;
}

console.log(...filter((a) => a.price < 20000, products));

