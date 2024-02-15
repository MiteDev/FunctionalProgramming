/**
 * 일급 함수
 *  - 함수를 값으로 다룰 수 있음
 *  - 조합성과 추상화의 도구
 */

// 일급함수 예시
const add5 = a => a + 5;
console.log(add5)
console.log(add5(5))

const f1 = () => () => 1;
console.log(f1)

const f2 = f1();

console.log(f2);
console.log(f2());