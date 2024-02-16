const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
];


let names = [];

for (const p of products) {
    names.push(p.name);
}

let prices = [];
for (const p of products) {
    prices.push(p.price);
}



const map = (func, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(func(a));
    }
    return res;
}



console.log(map(p => p.name, products));

console.log(map(p => p.price, products));