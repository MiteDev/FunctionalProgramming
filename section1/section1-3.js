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
iterator.next()

for (const it of iterator) console.log(it); // TypeError: iterator is not iterable


const well_formed_iterable = {
    [Symbol.iterator]() {
        let i = 3;
        return {
            next() {
                return i === 0 ? { value: undefined, done: true } : {
                    value: i--, done: false
                }
            },
            [Symbol.iterator]() {
                return this;
            }
        }
    }
}

let well_formed_it = well_formed_iterable[Symbol.iterator]();
well_formed_it.next();
for(const a of well_formed_it) console.log(a);