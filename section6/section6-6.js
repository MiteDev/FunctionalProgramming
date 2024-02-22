const L = {};
L.filter = function* (func, iter) {
    for (const it of iter) if (func(it)) yield it;
}

const f = L.filter(a => a % 2, [1, 2, 3, 4, 5, 6, 7, 8]);

console.log(...f)