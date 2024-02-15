// Generator를 사용해 odd값만 발생하는 Iterator 작성 예제

console.clear();

function *odds(limit) {
    for(let i = 0; i < limit; i++) if (i % 2) yield i;
}

const iter = odds(10);
console.log('iter')
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());


// 무한 수열
function *infinity(i = 0) {
    while (true) yield i++; // => while (true) 지만 iter2.next()를 평가할 때 까지만 동작하기 때문에 프로그램이 터지는 일은 없음 
}

const iter2 = infinity();

console.log('iter2')
console.log(iter2.next());



function *odds2(limit) {
    for (const a of infinity(1)) {
        if (a % 2) yield a;
        if (a === limit) return;
    }
}

console.log('iter3');
const iter3 = odds2(10);
console.log(iter3.next());

function *limit(limit, iterable) {
    for(const a of iterable){
        yield a;
        if(a === limit) return;
    }
}

const iter4 = limit(4, [1, 2, 3, 4, 5, 6]);
console.log('iter4')
console.log(iter4.next())
console.log(iter4.next())
console.log(iter4.next())
console.log(iter4.next())
console.log(iter4.next())


function* odds3(l) {
    for (const a of limit(l, infinity(1))) {
        if (a % 2) yield a;
    }
}

const iter5= odds3(10);

console.log('iter5')
for (const a of iter5) {
    console.log(a);
}