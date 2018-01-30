class A {
  foo: number;
  bar = "hello";
  baz: boolean; // Error!
  constructor() {
    this.foo = 42;
  }
}

class B {
  foo!: number; // Notice this '!' modifier.
  constructor() {
    this.initialize();
  }
  initialize() {
    this.foo = 0;
  }
}
