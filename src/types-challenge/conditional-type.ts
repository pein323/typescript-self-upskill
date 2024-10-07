import { Expect, Equal, NotEqual } from "./setup";

//Implement a type that evaluates to T if the type C is true or F if C is false.
//Implement this type
type If<C, T, F> = C extends true ? T : F;

type ifCases = [
  Expect<Equal<If<true, "apple", "pear">, "apple">>,
  Expect<Equal<If<false, "orange", 42>, 42>>
];

//Implement a type that evaluates to true if the type A ends with the type B, otherwise false.
// Implement this type
// type EndsWith<A, B> = any;
type EndsWith<A extends string, B extends string> = A extends `${string}${B}`
  ? true
  : false;

type endsWithCases = [
  Expect<Equal<EndsWith<"ice cream", "cream">, true>>,
  Expect<Equal<EndsWith<"ice cream", "chocolate">, false>>
];

//Implement a type that evaluates to a numeric type literal, equivalent to the length of a specified tuple type T
// Implement this type
// type LengthOfTuple<T> = never;
type LengthOfTuple<T> = T extends readonly any[] ? T["length"] : never;

// Tests
const Fruits = ["cherry", "banana"] as const;
type fruitCases = [
  Expect<Equal<LengthOfTuple<[1, 2, 3]>, 3>>,
  Expect<NotEqual<LengthOfTuple<[1, 2, 3]>, 2>>,
  Expect<Equal<LengthOfTuple<typeof Fruits>, 2>>,
  Expect<Equal<LengthOfTuple<[]>, 0>>
];

// Implement a type that emits the return type of a function type F
// Implement this type
// type ReturnOf<F> = never
type ReturnOf<F> = F extends { (...arg: any[]): infer RT } ? RT : never;

// Tests
const flipCoin = () => (Math.random() > 0.5 ? "heads" : "tails");
const rockPaperScissors = (arg: 1 | 2 | 3) => {
  return arg === 1
    ? ("rock" as const)
    : arg === 2
    ? ("paper" as const)
    : ("scissors" as const);
};

type ComplexObject = {
  a: [12, "foo"];
  bar: "hello";
  prev(): number;
};

type returnOfCases = [
  // simple 1
  Expect<Equal<boolean, ReturnOf<() => boolean>>>,
  // simple 2
  Expect<Equal<123, ReturnOf<() => 123>>>,
  Expect<Equal<ComplexObject, ReturnOf<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, ReturnOf<() => Promise<boolean>>>>,
  Expect<Equal<() => "foo", ReturnOf<() => () => "foo">>>,
  Expect<Equal<"heads" | "tails", ReturnOf<typeof flipCoin>>>,
  Expect<
    Equal<"rock" | "paper" | "scissors", ReturnOf<typeof rockPaperScissors>>
  >
];

//Implement a type that splits a string literal type S by a delimiter SEP,
//emitting a tuple type containing the string literal types for all of the “tokens”
// Implement this type
// type Split<S extends string, SEP extends string> = any
// Implement this type
type Split<
  S extends string,
  SEP extends string
> = S extends `${infer R}${SEP}${infer T}`
  ? [R, ...Split<T, SEP>]
  : S extends ""
  ? []
  : string extends S
  ? string[]
  : [S];

type splitCases = [
  Expect<Equal<Split<"Hi! How are you?", "z">, ["Hi! How are you?"]>>,
  Expect<Equal<Split<"Hi! How are you?", " ">, ["Hi!", "How", "are", "you?"]>>,
  Expect<
    Equal<
      Split<"Hi! How are you?", "">,
      [
        "H",
        "i",
        "!",
        " ",
        "H",
        "o",
        "w",
        " ",
        "a",
        "r",
        "e",
        " ",
        "y",
        "o",
        "u",
        "?"
      ]
    >
  >,
  Expect<Equal<Split<"", "">, []>>,
  // TODO: Expect<Equal<Split<"", "z">, [""]>>,
  Expect<Equal<Split<string, "whatever">, string[]>>
];
