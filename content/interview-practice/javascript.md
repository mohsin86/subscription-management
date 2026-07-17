# JavaScript

**JS1: Explain the event loop.**
The call stack runs first. Once it's empty, microtasks (Promises) run before macrotasks (`setTimeout`), even if the timer is 0ms.
```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

**JS2: What is a closure?**
A function that remembers variables from where it was created, even after that outer function has finished running.
```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
```
Classic bug: `var` in a loop with `setTimeout` — all callbacks share the same variable.
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}
// fix: use `let` instead of `var`
```

**JS3: var vs let vs const?**
`var` is function-scoped and hoisted (usable before declaration, as `undefined`). `let`/`const` are block-scoped and sit in a "temporal dead zone" until their line runs. `const` can't be reassigned.

**JS4: What is prototypal inheritance?**
Objects inherit properties from another object (their prototype), not from a class blueprint.
```js
const animal = { eats: true };
const dog = Object.create(animal);
console.log(dog.eats); // true, found on the prototype
```

**JS5: == vs ===?**
`==` converts types before comparing; `===` doesn't. Always prefer `===`.
```js
1 == '1';  // true
1 === '1'; // false
```

**JS6: What is `this`?**
In a regular function, `this` is whoever called it. In an arrow function, `this` is inherited from the surrounding scope — arrow functions have no `this` of their own.
```js
const obj = {
  name: 'Sub Tracker',
  regular() { console.log(this.name); },   // 'Sub Tracker'
  arrow: () => { console.log(this.name); }, // undefined
};
```

**JS7: Promise.all vs allSettled vs race?**
`all` waits for every promise but rejects immediately if one fails. `allSettled` waits for every promise and never rejects — it reports each result's status. `race` settles as soon as the first promise settles.
```js
await Promise.allSettled([Promise.resolve(1), Promise.reject('err')]);
// [{status:'fulfilled', value:1}, {status:'rejected', reason:'err'}]
```

**JS8: Deep vs shallow copy?**
`{...obj}` is shallow — nested objects are still shared. `structuredClone(obj)` is a true deep copy.
```js
const original = { user: { name: 'A' } };
const shallow = { ...original };
shallow.user.name = 'B';
console.log(original.user.name); // 'B' — shared!

const deep = structuredClone(original);
deep.user.name = 'C';
console.log(original.user.name); // still 'B'
```

**JS9: Debounce vs throttle?**
Debounce waits until the user stops (good for search input). Throttle runs at most once every X ms (good for scroll handlers).
```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

**JS10: What is currying?**
Turning a function with many args into a chain of one-arg functions.
```js
const add = (a) => (b) => a + b;
add(2)(3); // 5
```

**JS11: What is event delegation?**
Put one listener on a parent instead of one per child — events "bubble up" from the child that was actually clicked.
```js
list.addEventListener('click', (e) => {
  console.log('Clicked:', e.target.textContent);
});
```

**JS12: null vs undefined?**
`undefined` = declared but no value assigned yet. `null` = explicitly set to "no value" on purpose.

**JS13: call vs apply vs bind?**
All three set `this` manually. `call`/`apply` run the function immediately; `bind` returns a new function to call later.
```js
function greet() { console.log(`Hi, ${this.name}`); }
const user = { name: 'Mohasin' };
greet.call(user);          // runs now
const bound = greet.bind(user);
bound();                   // runs later
```

**JS14: What are higher-order functions?**
Functions that take/return other functions — `map`, `filter`, `reduce` are the classic examples.
```js
const total = [9.99, 4.99, 14.99]
  .filter(p => p > 5)
  .reduce((sum, p) => sum + p, 0);
```

**JS15: What causes a memory leak in JS?**
Forgotten `setInterval`/`setTimeout`, event listeners never removed, and closures holding onto data longer than needed. Fix by cleaning up timers/listeners (e.g. in React's `useEffect` cleanup function).


**What are generators, and how do they differ from regular functions?**
A generator (function*) can pause and resume execution using yield, returning an iterator instead of a single value. Regular functions run start-to-finish in one go.
```
function* range(n) {
  for (let i = 0; i < n; i++) yield i;
}
for (const num of range(3)) console.log(num); // 0, 1, 2
```

**What is the spread operator vs the rest parameter?**
Spread (...) expands an array/object into individual elements; rest (...) collects multiple arguments into one array. Same syntax, opposite direction — spread is used when calling/building, rest when declaring parameters.
```
const nums = [1, 2, 3];
Math.max(...nums); // spread: expands into args
function sum(...args) { return args.reduce((a, b) => a + b); } // rest: collects into array
```

**What are Map and Set, and how are they different from a plain object/array?**
Map is a key-value store like an object, but keys can be any type (not just strings) and it keeps insertion order reliably. Set stores unique values only, like an array with automatic de-duplication.
```
const seen = new Set([1, 2, 2, 3]); // {1, 2, 3}
const m = new Map([['a', 1]]);
m.get('a'); // 1
```

**What is a WeakMap, and why would you use one over a Map?**
A WeakMap's keys must be objects, and those keys are garbage-collected automatically once nothing else references them — useful for attaching private/extra data to an object without causing a memory leak if that object is later discarded.

**What does Object.freeze() do, and how is it different from const?**
const stops you from reassigning the variable itself, but the object it points to can still be mutated. Object.freeze() prevents changes to the object's properties too (in strict mode, changes throw; otherwise they silently fail).
```
const user = Object.freeze({ name: 'A' });
user.name = 'B'; // silently ignored (or throws in strict mode)
user.name; // still 'A'
```

**What is optional chaining (?.) and nullish coalescing (??), and how do they differ from ||?**
?. stops and returns undefined instead of throwing if something in the chain is null/undefined. ?? falls back only when the left side is null or undefined — unlike ||, which also falls back on falsy values like 0 or ''.
```
const city = user?.address?.city;
const count = 0;
count || 5; // 5 (wrong if 0 is valid!)
count ?? 5; // 0 (correct)
```

**What is the difference between Array.forEach and Array.map — why can't you return out of forEach?**
map returns a new array built from each element's transformed value. forEach just runs a function per element and always returns undefined — any return inside it only exits that one callback call, it doesn't build anything or stop the loop.

**What is a Promise under the hood?**
An object representing an eventual result, always in one of three states: pending, fulfilled (resolved with a value), or rejected (failed with a reason). Once it settles, it can never change state again.

**What is async/await really doing?**
Syntactic sugar over Promises — an async function always returns a Promise, and await pauses that function (without blocking the whole program) until the Promise it's waiting on settles, then unwraps the value or throws the rejection.

**What is the difference between synchronous and asynchronous error handling?**
A synchronous throw inside a regular function must be caught by a surrounding try/catch at the call site. A rejected Promise doesn't throw immediately — it needs .catch() or an await inside try/catch, otherwise it becomes an unhandled rejection instead of crashing the line that caused it.

**What is destructuring, and how does it work with default values and renaming?**
Pulls values out of an array/object into individual variables in one step. You can rename a property while destructuring, and supply a default if the value is undefined.
```
const { name: userName = 'Guest' } = user;
const [first, , third] = [1, 2, 3]; // skips the 2nd
```

**What is the difference between Object.keys(), Object.values(), and Object.entries()?**
keys() returns an array of property names, values() returns an array of the values, entries() returns an array of [key, value] pairs — useful for looping with a for...of.

**What does JSON.stringify silently drop?**
undefined values, functions, and Symbol properties are skipped entirely (or turned to null inside arrays) when converting an object to JSON — there's no equivalent in the JSON spec for any of them.

**What is strict mode ('use strict'), and what does it change?**
An opt-in stricter variant of JS that turns silent mistakes into real errors — e.g. assigning to an undeclared variable throws instead of creating a global. ES modules and classes are strict mode by default.

**What is an IIFE, and why was it used before ES modules?**
An Immediately Invoked Function Expression — a function defined and called in the same statement, creating a private scope. Before ES modules existed, it was the standard way to avoid polluting the global scope.
```
(function () {
  const secret = 'hidden';
})(); // secret isn't accessible outside
```