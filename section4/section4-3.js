// curry: 함수를 값으로 받으면서 받아둔 함수를 내가 원하는 시점에 평가시키는 함수
// 인자를 받아서 인자를 원하는 갯수 만큼 들어왔을 때 받아두었던 함수는 나중에 평가시키는 함수

const go = (...args) => args.reduce((acc, cur) => cur(acc));

const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
];

const c_map = curry((fn, arr) => {
    console.log(arr)
    return arr.map(fn)
});
const c_filter = curry((fn, arr) => arr.filter(fn));
const c_reduce = curry((fn, arr) => arr.reduce(fn))

go(
    products,
    c_map(p => p.price),
    c_filter(p => p < 20000),
    c_reduce((acc, cur) => acc + cur),
    console.log
)