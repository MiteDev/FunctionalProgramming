// Kleisli Composition
// 오류가 있을 수 있는 상황에서의 함수 합성을 안전하게 할 수 있는 하나의 규칙

const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = (func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const it of iter) acc = func(acc, it);
    return acc;
}

const L = {
    filter: curry(function* (func, iter) {
        for (const it of iter)
            if (func(it))
                yield it;
    })
}

const go = (...args) => reduce((a, f) => f(a), args);

const take = curry((limit, iter) => {
    const rst = [];
    for (const it of iter) {
        rst.push(it);
        if (rst.length === limit) return rst;
    }
    return rst;
})

const find = (func, iter) => go(
    iter,
    L.filter(func),
    take(1),
    ([a]) => a
)

const users = [
    { id: 2, name: 'dd' },
    { id: 1, name: 'aa' },
    { id: 2, name: 'bb' },
    { id: 3, name: 'cc' },

];

const getUserById = id => find(u => u.id == id, users) || Promise.reject('No Id Found');
const f = ({ name }) => name;
const g = getUserById;
const fg = id => Promise.resolve(id).then(g).then(f).catch(a => a);

fg().then(console.log) // => No Id Found
fg(2).then(console.log) // => dd