// Spread Operator

const arr = [1, 2];
arr[Symbol.iterator] = null; 
console.log(...arr) // => TypeError: Found non-callable @@iterator