/* 
    Generator는 Iterable/Iterator Protocol을 따르기 때문에 
    for...of, Spread Operator, 구조 분해, 나머지 연산자 등의 함수들과 사용될 수 있음
*/

function *infinity(i = 0) {
    while(true) yield i++;
}

function *limit(l, iterable) {
    for(const a of iterable) {
        yield a;
        if (a === l) return;
    }
}

function *odd(l) {
    for(const a of limit(l, infinity(1)))
        if(a % 2) yield a;
    
}

for(const a of odd(10)) {
    console.log(a)
}

console.log(...odd(10))
console.log([...odd(10), ...odd(20)]);

const [a, b, ...rest] = odd(10);
console.log(a);
console.log(b)
console.log(rest);