// go 함수는 인자로 함수들을 받아 차례대로 실행시켜 결과를 return 하는 함수

// const reduce = (func, acc, iter) => {
//     if (!iter) {
//         iter = acc[Symbol.iterator]();
//         acc = iter.next().value;
//     }

//     for (const it of iter) {
//         console.log(acc);
//         console.log(it)
//         acc = func(acc, it);
//     }
//     return acc;
// };

// const go = (...args) => reduce((a, f) => f(a), args);

const go = (...args) => args.reduce((acc, cur) => cur(acc));

// const go = (...args) => {
//     return args.reduce((acc, cur) => {
//         return cur(acc);
//     })
// }

const a = go(
    10,
    a => a + 1,
    a => a + 10,
    a => a + 100,
    console.log
);