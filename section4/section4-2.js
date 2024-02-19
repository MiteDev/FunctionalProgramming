const go = (...args) => args.reduce((acc, cur) => cur(acc));

const pipe = (f, ...funcs) => (...init_v) => go(f(...init_v), ...funcs)


// const pipe = (...funcs) => {
//     return (init_v) => {
//         return funcs.reduce((acc, cur) => {
//             return cur(acc);
//         }, init_v)
//     }
// }


const pipeFunc = pipe(
    (a, b) => a + b,
    a => a + 1,
    a => a + 10,
    a => a + 100
)

// const a = pipeFunc(0, 1);
// console.log(a)

const b = go(
    pipeFunc
)

console.log(b)

