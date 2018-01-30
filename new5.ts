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