/*
    고차함수
        - 함수를 값으로 다루는 함수
*/

const apply1 = f => f(1);
const add2 = a => a + 2;
console.log(apply1(add2))
console.log(apply1(b => b - 2))

const times = (f, n) => {
    for (let i = 0; i < n; i++) f(i);
}

times(console.log, 3);
times(a => console.log(a + 10), 3)

// 함수를 만들어서 리턴 (클로저를 만들어서 리턴)
const addMaker = a => b => a + b;
const addMakerr = (a) => {
    return (b) => { return a + b };
}
const add10 = addMakerr(10);
console.log(add10(10))