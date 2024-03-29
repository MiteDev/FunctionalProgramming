// 일급 활용

const delay = a => new Promise(resolve => setTimeout(() => resolve(a), 100))
const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;


const n1 = 10;
const n2 = delay(20);
go1(go1(n1, add5), console.log);
go1(go1(n2, add5), console.log)