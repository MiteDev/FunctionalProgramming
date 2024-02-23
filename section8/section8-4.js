// 함수합성
// Promise는 비동기 상황에서 함수 합성을 안전하게 하기 위한 도구 => Promise는 비동기에 대한 문제를 해결하기 위한 모나드

const g = a => a + 1;
const f = a => a * a;

console.log(f(g(1))); // => 값을 안넣으면 NaN이나 에러 발생

[1].map(g).map(f).forEach(a => console.log(a)); // => 값을 넣지 않아도 문제가 발생하지 않음
[].map(g).map(f).forEach(a => console.log(a));

Promise.resolve(1).then(g).then(f).then(console.log);
Promise.resolve().then(g).then(f).then(console.log); // => NaN

// Promise는 비동기적으로 일어나는 상황을 안전하게 합성하기 위한것
new Promise(resolve => setTimeout(() => resolve(2), 100)).then(g).then(f).then(console.log)