const products = [
    { name: '반팔티', price: 15000, quantity: 1 },
    { name: '긴팔티', price: 20000, quantity: 2 },
    { name: '핸드폰케이스', price: 15000, quantity: 7 },
    { name: '후드티', price: 30000, quantity: 3 },
    { name: '바지', price: 25000, quantity: 5 },
];

const go = (...args) => args.reduce((acc, cur) => cur(acc));
const pipe = (...funcs) => init_v => go(init_v, ...funcs)

const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
// const pipe = (f, ...funcs) => (...init_v) => go(f(...init_v), ...funcs)

const c_map = curry((fn, arr) => arr.map(fn));
const c_filter = curry((fn, arr) => arr.filter(fn));
const c_reduce = curry((fn, arr) => arr.reduce(fn));

const add = (a, b) => a + b;

const sum = curry((f, iter) => go(
    iter,
    c_map(f),
    c_reduce(add)
))

const total_quantity = sum(p => p.quantity);

console.log(total_quantity(products));

const total_price = sum(p => p.quantity * p.price);

console.log(total_price(products))