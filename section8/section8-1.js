// callback

function add10(a, callback) {
    setTimeout(() => callback(a + 10), 100)
}

add10(5, console.log)

// promise

function add20(a) {
    return new Promise((resolve) => setTimeout(resolve(a + 20), 100))
}

add20(20).then(add20).then(add20).then(console.log)