const list = [1, 2, 3];
const str = 'abc';

// es5에서의 List 순회
for (var i = 0; i < list.length; i++) {
    console.log(list[i])
}

for (var i = 0; i < str.length; i++) {
    console.log(str[i])
}

// es6에서의 List 순회
for (const a of list) {
    console.log(a);
}

for (const a of str) {
    console.log(a);
}