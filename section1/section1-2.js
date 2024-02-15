// console.log('Array');
// const arr = [1, 2, 3];
// arr[Symbol.iterator] = null;
// for (const a of arr) { // Symbol.iterator를 제거했기 때문에 Error 발생
//     console.log(a);
// }

console.log('Set');
const set = new Set([1, 2, 3]);
for (const a of set) {
    console.log(a);
}

console.log('Map');
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
for (const a of map) {
    console.log(a);
}

/* 
    Iterable/Iterator Protocol
        - Iterable: Iterator를 return하는 [Symbol.iterator]() 를 가진 값
        - Iterator: { value, done } 객체를 return하는 next() 를 가진 값
        - Iterable/iterator Protocol: Iterable을 for...of, Spread Operator 등과 함께동작하도록 규약
*/

const arrr = [1, 2, 3]
let iterator = arrr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

/* 
    { value: 1, done: false }
    { value: 2, done: false }
    { value: 3, done: false }
    { value: undefined, done: true }

    for...of 를 예로 들면 variable에 value를 담고 done이 true가 되면 for...of를 빠져나옵니다 
*/

let iterator2 = arrr[Symbol.iterator]();
iterator2.next();
for (const a of iterator2) {
    console.log(a)
}

let iterator3 = set[Symbol.iterator]();
iterator3.next();
iterator3.next();

for (const a of iterator3) {
    console.log(a)
}

let iterator4 = map[Symbol.iterator]();
console.log(iterator4.next());
for (const a of iterator4) {
    console.log(a)
}

// map의 keys(), values()는 Iterator를 뽑아줌 => for...of에서 결국 똑같이 쓸 수 있음
console.log(map.keys());
console.log(map.values());

for (const a of map.keys()) console.log(a);
for (const a of map.values()) console.log(a);

// Symbol.iterator는 자기 자신을 그대로 return하도록 되어있음 => 솔직히 여긴 잘 이해 안됨 14:00부터 한번 다시 볼 것
let it = map.keys();
console.log(it[Symbol.iterator]());
it.next();
it.next();
it.next();
let it2 = it[Symbol.iterator]();
console.log(it2.next())

