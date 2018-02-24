// Synchronous iteration --> Symbol.iterator

const ary = ['a', 'b'];
const iterator = ary[Symbol.iterator]();
console.log(iterator.next()); // { value: 'a', done: false }
console.log(iterator.next()); // { value: 'b', done: false }
console.log(iterator.next()); // { value: undefined, done: true }


// Asynchronous iteration --> Symbol.asyncIterator
async function main() {
    const syncIterable = [
        Promise.resolve('a'),
        Promise.resolve('b'),
    ];
    for await (const x of syncIterable) {
        console.log("x", x);
    }
    
    for (const s of await Promise.all(syncIterable)) {
        console.log("s", s);
    }
}

// main();

// Asynchronous generators

async function asyncGenerators () {
    async function* createAsyncIterable(syncIterable) {
        for (const elem of syncIterable) {
            yield elem;
        }
    }
    
    const asyncGenObj = createAsyncIterable(['a', 'b']);
    const [{value:v1}, {value:v2}] = await Promise.all([
        asyncGenObj.next(), asyncGenObj.next()
    ]);
    console.log("v1", v1, "v2", v2);
}
asyncGenerators();
