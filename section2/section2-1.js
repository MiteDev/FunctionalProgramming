/* 
    Generator/Iterator
        - Generator: Iterator이자 Iterable을 생성하는 함수
*/

function *gen() {
    yield 1;
    if (false) yield 2;
    yield 3;
    return 100; // return을 해주면 마지막 value에 undefined가 아닌 return값이 들어감. 하지만 순회에 return값이 포함되지는 않음
}

let iter = gen();
console.log(iter[Symbol.iterator]() === iter);
iter.next();
iter.next();
console.log(iter.next())
console.log(iter.next()) 

for(const a of gen()) console.log(a)