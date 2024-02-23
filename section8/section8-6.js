const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const reduce = (func, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    return go1(acc, function recur(acc) {
        for (const it of iter) {
            acc = func(acc, it);
            if (acc instanceof Promise)
                return acc.then(recur);
        }

        return acc;
    });
}

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

go(
    Promise.resolve(1),
    a => a + 10,
    // a => Promise.reject('err'),
    a => Promise.resolve(a + 100),
    a => a + 1000,
    console.log
).catch(console.log);

// Promise.then의 규칙
// then의 인자로 들어오는 값은 절대 Promise면 안된다.
// Promise가 아무리 중첩되어 있어도 then 한번으로 값을 꺼내올 수 있음
Promise.resolve(Promise.resolve(Promise.resolve(1))).then(console.log);
new Promise(resolve => resolve(new Promise(resolve => resolve(new Promise(resolve => resolve(1)))))).then(console.log)