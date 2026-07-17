# TypeScript

**TS1: interface vs type?**
`interface` is for object shapes, especially ones you might extend later. `type` also handles unions, tuples, and primitives. Mostly interchangeable for simple objects.
```ts
interface User { name: string }
type ID = string | number;
```

**TS2: What is a generic?**
A placeholder type filled in when the function/type is used.
```ts
function identity<T>(value: T): T { return value; }
identity<string>('hello');
```

**TS3: unknown vs any?**
`any` disables type checking. `unknown` forces you to check the type before using it.
```ts
function handle(data: unknown) {
  if (typeof data === 'string') data.toUpperCase(); // safe here
}
```

**TS4: What are utility types?**
Built-in helpers that transform an existing type.
```ts
interface User { id: string; name: string; email: string; }
type UserPreview = Pick<User, 'id' | 'name'>;
type PartialUser = Partial<User>; // all fields optional
```

**TS5: What is a discriminated union?**
A union of object types sharing one "tag" field, which TypeScript uses to narrow the type.
```ts
type Status = { kind: 'active' } | { kind: 'expired'; expiredAt: Date };
function label(s: Status) {
  if (s.kind === 'expired') return `Expired ${s.expiredAt}`;
  return 'Active';
}
```

**TS6: Inference vs explicit typing?**
TS infers types from values when it can. You annotate when it can't guess (function parameters) or for clarity.
```ts
let count = 5; // inferred as number
function add(a: number, b: number): number { return a + b; }
```

**TS7: What are mapped types?**
Build a new type by transforming every property of another type.
```ts
type ReadonlyUser = { readonly [K in keyof User]: User[K] };
```

**TS8: enum vs string literal union?**
String literal unions are simpler and generate no extra JS; enums generate a real runtime object. Most teams prefer literal unions today.
```ts
type Role = 'ADMIN' | 'MEMBER'; // preferred
```

**TS9: What is structural typing?**
TS compares shape, not name — if a value has the required properties, it's compatible, even with extra ones. Note: assigning an object *literal* directly triggers an "excess property check" that a plain variable assignment doesn't, so the extra property has to arrive through a variable to see this in practice.
```ts
interface Point { x: number; y: number; }
const raw = { x: 1, y: 2, z: 3 };
const p: Point = raw; // fine — structural typing, extra property ignored
```

**TS10: What are function overloads?**
Multiple call signatures for one function, so callers get the right return type per input.
```ts
function format(v: string): string;
function format(v: number): string;
function format(v: any): string { return String(v); }
```

**TS11: What are decorators?**
Annotations (`@something`) that modify a class or method — common in frameworks like NestJS.
```ts
@Injectable()
class UserService {}
```

**TS12: What are conditional types?**
A type-level if/else.
```ts
type IsString<T> = T extends string ? true : false;
type A = IsString<'hi'>; // true
```

**TS13: What do keyof/typeof do?**
`keyof` gets the property names of a type as a union.
```ts
interface User { id: string; name: string; }
type UserKey = keyof User; // 'id' | 'name'
```

**TS14: What does `satisfies` do?**
Checks a value matches a type without widening the more specific inferred type.
```ts
const config = { role: 'admin' } satisfies { role: string };
// config.role stays 'admin', not just string
```

**TS15: What is declaration merging / .d.ts?**
`.d.ts` files describe types for plain JS libraries with no built-in types. TS also lets the same interface be declared in two places and merges them into one.


**What is the never type, and where does it show up?**
Represents a value that never occurs — a function that always throws or loops forever returns never. It's also what's left in an exhaustive switch's default case once every real option has been handled, a good way to catch a forgotten case at compile time.

**What is a type guard, and how do you write a custom one?**
A check that narrows a broader type to a more specific one within an if block. A custom one is a function returning `param is SpecificType`.
```
function isString(val: unknown): val is string {
  return typeof val === 'string';
}
```

**What is the difference between an enum and a const enum?**
A regular enum generates a real JS object at runtime you can inspect. A const enum is fully inlined at compile time — no object is generated — so it's slightly faster but doesn't work in every situation (e.g. across certain module boundaries).

**What is as const, and how does it change type inference?**
Tells TypeScript to infer the narrowest possible (literal) type instead of widening it to a general one, and makes the value deeply readonly.
```
const status = 'active'; // type: string
const status2 = 'active' as const; // type: 'active'
```

**What is an index signature, and when do you need one?**
Lets you type an object whose exact property names aren't known ahead of time, only the shape of its keys/values.
```
interface Scores { [studentName: string]: number }
```

**What is the difference between interface extension and type intersection?**
interface Child extends Parent {} and type Child = Parent & { ... } achieve a similar result, but interfaces support declaration merging and are generally preferred for object shapes, while intersections work with any type including unions.

**What are tuple types, and how do they differ from arrays?**
A tuple is a fixed-length array where each position has its own specific type, unlike a regular array where every element is the same type.
```
const pair: [string, number] = ['age', 30];
```

**What is the infer keyword used for inside conditional types?**
Lets you extract and name a type from within another type as part of a conditional type check — commonly used to pull out a function's return type or a Promise's resolved value.
```
type Awaited<T> = T extends Promise<infer U> ? U : T;
```

**What's the difference between abstract class and interface?**
An interface only describes shape, with zero implementation. An abstract class can provide real shared implementation alongside abstract methods that subclasses must fill in — useful when subclasses need to share actual behavior, not just a contract.

**What is the difference between readonly properties and Readonly<T>?**
readonly marks individual properties as non-reassignable one at a time. Readonly<T> is a utility type that wraps an entire existing type, making every property readonly at once without rewriting each field.

**What does strict: true in tsconfig actually enable?**
A bundle of stricter checks — including strictNullChecks (null/undefined must be handled explicitly) and noImplicitAny (no silently-typed any) — turned on together rather than one at a time.

**What is a type assertion, and how is it different from casting in other languages?**
`value as Type` tells the compiler to treat this as Type — it's a compile-time-only annotation with zero runtime effect, unlike a real cast in languages like Java/C#, which can actually convert or check the value at runtime.

**What are ambient declarations, and when do you need them?**
declare statements (usually in a .d.ts file) describe the shape of something that exists at runtime but has no TypeScript source — e.g. a global variable injected by a script tag, or types for a plain JS library.

**What is the difference between a namespace and a module in TypeScript?**
A module is just a file with imports/exports — the modern standard. A namespace is an older TypeScript-only way to group code under one global name, mostly seen in legacy code or ambient type declarations today.

**How do parameter properties in a class constructor work?**
Adding a visibility modifier directly to a constructor parameter (private, public, readonly) auto-declares and assigns it as a class property, skipping the usual declare-then-assign boilerplate.
```
class User {
  constructor(private readonly name: string) {}
}
```