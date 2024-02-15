// 사용자 정의 iterable

const iterable = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next() {
                return i === 0 ? { value: undefined, done: true } : {
                    value: i--, done: false
                }
            }
        }
    }
}

let iterator = iterable[Symbol.iterator]();
console.log(iterator.next());

for (const it of iterable) console.log(it);