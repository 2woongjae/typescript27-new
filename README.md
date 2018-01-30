# TypeScript 2.7

## 1. Definite Assignment Checks for Class Properties
`—strictPropertyInitialization`  옵션

* strict 가 true 이면 함께 true
* 클래스의 프로퍼티에 초기화 값을 적지 않으면 컴파일 에러
	* 선언과 동시에 값 할당하지 않거나,
	* constructor 에서 값을 할당하지 않으면
* 초기 값이 undefined 가 안되도록

```
class A {
    foo: number;
    bar = "hello";
    baz: boolean; //  Error!
    constructor() {
        this.foo = 42;
    }
}
// baz 는 boolean | undefined 타입으로 지정하면 에러 X
```

* 2가지 케이스가 아닌 경우, 명시적으로 지정하는 방법
	* `definite assignment assertion` 이라고 부름

```
class B {
    foo!: number; // Notice this '!' modifier.
    constructor() {
        this.initialize();
    }
    initialize() {
        this.foo = 0;
    }
}
```

---

## 2. Fixed Length Tuples
* 길이를 지정한 튜플

```
interface NumStrTuple extends Array<number | string> {
    0: number;
    1: string;
    length: 2;
}
```

* 기존 튜플 스타일

```
interface MinimumNumStrTuple extends Array<number | string> {
    0: number;
    1: string;
}
```

---

## 3. Improved narrowing for in and instanceof
* in : 타입 가드

```
interface A { a: number };
interface B { b: string };

function foo(x: A | B) {
    if ("a" in x) {
        return x.a;
    }
    return x.b;
}
```

* instanceof 가 좋아짐

```
// Error! 
export class C {
    foo = 1;
}

export class D extends C {
    bar = 2;
}

export class E {
    foo = 3;
}

declare let x: C | D | E;

if (x instanceof E) {
    x // 'E', but previously 'D | E'
} else {
    x // 'C | D', but previously 'C'
}
```

* `타입 어설션` 뿐만 아니라 `타입 선언` 도 변경이 필요할 수 있음.

---

## 4. Inferences from generic signatures now use base constraint types of type parameters instead of any.
```
declare function createInstance<A1, T>(ctor: Constructor<A1, T>, first: A1): T;

interface Constructor<A1, T> {
    new(first: A1): T;
}

export class Con<T> {
    constructor(x: number) {
    }
}

createInstance(Con, 3) // Used to be `Con<any>`, now `Con<{}>`

declare const s: <R>(go: <S>(ops: { init(): S; }) => R) => R;
const x = s(a => a.init());  // x is any, should have been {}
```

---

## 5. The setSelectionRange API now only accepts "forward" | "backward" | "none".
	* [HTMLInputElement.setSelectionRange() - Web API 참조 문서 | MDN](https://developer.mozilla.org/ko/docs/Web/API/HTMLInputElement/setSelectionRange)

```
interface HTMLInputElement extends HTMLElement {
	...
	setSelectionRange(start: number, end: number, direction?: "forward" | "backward" | "none"): void;
	...
}
```

---

## 6. allowSyntheticDefaultImports no longer synthesizes default imports from TypeScript implementation files (i.e. .ts and .tsx).

```
import * as React from 'react';

import React from 'react';
```