const range = l => {
    let i = -1;
    let res = []
    while (++i < l) res.push(i);
    return res;
};

const add = (a, b) => a + b;

const list = range(4);

const reduce = (func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const it of iter) {
        acc = func(acc, it)
    };
    return acc;
}


console.log(reduce(add, list))

// 느긋한 L.range
const L = {}
L.range = function* (l) { // => next()가 실행되기 전 까지 함수 내부의 어떠한 코드도 동작하지 않음. console.log(reduce(add, list_l));를 하기 전에는 L.range 함수의 어떤 코드도 평가되지 않음
    let i = -1;
    while (++i < l) {
        console.log(i, 'L.range')
        yield i;
    };
};

const list_l = L.range(4);

console.log(reduce(add, list_l));