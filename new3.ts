interface A { a: number };
interface B { b: string };

function foo(x: A | B) {
    if ("a" in x) {
        return x.a;
    }
    return x.b;
}

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