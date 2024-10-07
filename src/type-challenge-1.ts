//Implement a type that evaluates to T if the type C is true or F if C is false.
// -- setup
type Expect<T extends true> = T
type Equal<X, Y> =
(<T>() => T extends X ? 1 : 2) extends
(<T>() => T extends Y ? 1 : 2) ? true : false

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true
//-- end setup
// Implement this type
// type If<C, T, F> = never;
type If<C, T, F> = C extends true ? T: F;

type cases = [
  Expect<Equal<If<true, "apple", "pear">, "apple">>,
  Expect<Equal<If<false, "orange", 42>, 42>>
];
