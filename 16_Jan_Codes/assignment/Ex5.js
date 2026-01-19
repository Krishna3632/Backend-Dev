console.log('A');

process.nextTick(() => console.log('B'));
Promise.resolve().then(() => console.log('C'));
setTimeout(() => console.log('D'), 0);
setImmediate(() => console.log('E'));

console.log('F');