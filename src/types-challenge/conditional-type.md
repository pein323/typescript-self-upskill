# Types tweaks
## Conditional Type - `If` 

The following TypeScript code snippet defines a **conditional type** called `If`. This type functions like a ternary operator but operates at the **type level**.

**PL:** Poniższy fragment kodu TypeScript definiuje **warunkowy typ** o nazwie `If`. Ten typ działa podobnie do operatora trójskładnikowego (ternary), ale na poziomie **typów**.

```ts
type If<C, T, F> = C extends true ? T : F;
```

### Components
1. **Type parameters**
   *  `C`:This represents the condition. It is a type, which will be checked against `true`
   * `T`: This represents the type to return if `C` evaluates to `true`
   * `F`: This represents the type to return if `C` evaluates to `false`.
2. **Conditional Type**: The syntax `C extends true ? T : F` is TypeScript's **conditional type** syntax. It acts like a ternary operator at the type level:
   * `C extends true` checks if `C` is assignable to the type `true`.
   * If `C` is `true`, the type resolves to `T`.
   * If `C` is anything other than `true`, the type resolves to `F`.

### How it works:
* If `C` is `true`, `If` will evaluate to the type `T`.
* If `C` is `false` (or anything other than `true`), `If` will evaluate to the type `F`.

```ts
type Result1 = If<true, "Yes", "No">;  // Result1 = "Yes"
type Result2 = If<false, "Yes", "No">; // Result2 = "No"
type Result3 = If<42, "Yes", "No">;    // Result3 = "No" (because 42 is not true)
```

### Explanation:
* In `Result1`, `C` is `true`, so the type resolves to `"Yes"`.
* In `Result2`, `C` is false, so the type resolves to `"No"`.
* In `Result3`, `C` is `42` (which is not true), so the type resolves to `"No"`.

### Conclusion:
The If type is a conditional type that lets you choose between two types (`T` or `F`) based on a condition (`C`). It's useful for writing **generic types** that behave differently based on some input type.

**PL:** Typ If to **warunkowy typ**, który pozwala wybrać między dwoma typami (`T` lub `F`) na podstawie warunku (`C`). Jest to przydatne do pisania **typów generycznych**, które zachowują się inaczej w zależności od danego typu wejściowego.

## Conditional type - `EndsWith`

EndsWith that checks whether a string `A` ends with a string `B`

```ts
type EndsWith<A extends string, B extends string> = A extends `${string}${B}` ? true : false;
```

### Components
1. **Type Parameters**:
   * `A extends string`: `A` is a type parameter that must be a string.
   * `B extends string`: `B` is another type parameter, which also must be a string.
2. **Conditional Type**: The `A extends ${string}${B}` part is where the conditional type checks if the string `A` matches a specific pattern. The pattern is a template literal type that combines two parts:
   * `${string}`: Represents any string that can come before `B`.
   * `${B}`: Represents the string B that should appear at the end of `A`.
   * If `A` matches this pattern (i.e., it ends with `B`), the type resolves to `true`.
   * Otherwise, the type resolves to `false`.

### How It Works
The type checks whether `A` can be decomposed into some string followed by `B`. If this is possible, it means `A` ends with `B`, and the type resolves to `true`. If not, it resolves to `false`.

```ts
type Test1 = EndsWith<'typescript', 'script'>; // true, because "typescript" ends with "script"
type Test2 = EndsWith<'typescript', 'type'>;   // false, because "typescript" does not end with "type"
type Test3 = EndsWith<'hello world', 'world'>; // true, because "hello world" ends with "world"
type Test4 = EndsWith<'abc', 'd'>;             // false, because "abc" does not end with "d"
```

### Conclusion
The `EndsWith` type is a conditional type that checks if one string ends with another by using TypeScript's **template literal types**. It allows you to create type-level logic based on string patterns, which is especially useful in type-checking complex string-based scenarios.

## Conditional [Utility] Type - `LengthOfTuple`

The provided TypeScript snippet defines a utility type `LengthOfTuple` that computes the length of a tuple type `T`. 

```ts
type LengthOfTuple<T> = T extends readonly any[] ? T["length"] : never;
```
### Breakdown

1. `T extends readonly any[]`:
   * This is a conditional type. It checks if `T` is a tuple or an array.
   * `readonly any[]` means that `T` should be a readonly array (including tuples) of any element types.
   * If `T` is an array (or tuple), the condition is `true`, and TypeScript proceeds to the next part: `T["length"]`.
2. ` T["length"]`:
   * If `T` is an array (or tuple), this part extracts its `length` property.
    * In TypeScript, tuples have a known `length` at compile time. Therefore, `T["length"]` will evaluate to the exact number of elements in the tuple.
3. never:
    * If `T` is not a tuple or array, the condition is `false`, and the result of `LengthOfTuple` will be `never`, which represents a type that should never occur.

### Example Usages
```ts
type Tuple1 = [number, string, boolean];  // Tuple with 3 elements
type Length1 = LengthOfTuple<Tuple1>;     // Length1 will be 3

type Tuple2 = [number];                   // Tuple with 1 element
type Length2 = LengthOfTuple<Tuple2>;     // Length2 will be 1

type NotTuple = number;                   // Not a tuple
type Length3 = LengthOfTuple<NotTuple>;   // Length3 will be never (because NotTuple is not an array)
```
### Summary
* The utility type `LengthOfTuple<T>` checks if `T` is an array or tuple. If it is, it extracts and returns the tuple's length; otherwise, it returns `never`.
* It's useful when working with tuple types in TypeScript and needing to compute their length at the type level.

## Conditional [Utility] type - `ReturnOf`
**conditional type** called `ReturnOf`, which extracts the return type of a given function type `F`

```ts
type ReturnOf<F> = F extends { (...arg: any[]): infer RT } ? RT : never;
```

### Components
1. **Type Parameters**:
   * `F`: The type parameter representing a function. This type will be checked to see if it can be inferred as a function with specific arguments and return type.
2. **Conditional Type**: The conditional type checks if `F` extends (is compatible with) a function signature:
   ```ts
   F extends { (...arg: any[]): infer RT }
   ```

   * `{ (...arg: any[]): infer RT }`: This is a function type definition that accepts any arguments (denoted by (`...arg: any[])`) and has a return type `RT`, which is inferred using the `infer` keyword.
     * `(...arg: any[])`: Represents a function that can take any number of arguments (`any[]` is an array of any type).
     * `infer RT:` The infer keyword is used to extract and capture the return type (`RT`) of the function if `F` is indeed a function.
   * If `F` matches this pattern (i.e., it’s a function), the return type `RT` is inferred, and `ReturnOf<F>` resolves to `RT`.
   * Otherwise, if `F` is not a function, the type resolves to `never`.
3. **Return Type**:
   * `RT`: The return type of the function `F`, inferred using the `infer` keyword.
   * `never`: If `F` is not a function type, the type resolves to `never`, indicating that it cannot infer a return type.

### How It Works
* The type checks if `F` is a function. If it is, it extracts and returns the function's return type (`RT`).
* If `F` is not a function, the type returns `never`, meaning there is no valid return type to extract.

```ts
type Func1 = () => string;
type Func2 = (x: number) => boolean;
type NotAFunction = number;

type Return1 = ReturnOf<Func1>;  // Return1 = string
type Return2 = ReturnOf<Func2>;  // Return2 = boolean
type Return3 = ReturnOf<NotAFunction>; // Return3 = never
```
### Explanation:
* `ReturnOf<Func1>`: `Func1` is a function that returns a `string`, so `Return1` is inferred as `string`.
* `ReturnOf<Func2>`: `Func2` is a function that returns a `boolean`, so `Return2` is inferred as `boolean`.
* `ReturnOf<NotAFunction>`: `NotAFunction` is not a function, so `ReturnOf` evaluates to `never`, indicating that it’s not possible to extract a return type.

### Conclusion
The `ReturnOf<F>` type is a **utility type** that extracts the return type of a function `F` using **type inference**. It works by checking if `F` matches the signature of a function, and if so, infers and returns its return type. Otherwise, it returns `never` for non-function types. This is useful for working with generic functions or dynamically determining the return type of a given function at the type level.


## Conditional [Utility][Recursive] type - `Split`

This TypeScript code defines a **recursive conditional type** named Split. It is designed to split a string `S` into an array of substrings, using the separator `SEP` (a string) to determine where the splits occur.

```ts
type Split<S extends string, SEP extends string >
```
* `Split`: The name of the type.
* `S extends string`: `S` is the string type that will be split.
* `SEP extends string`: `SEP` is the separator (a string) used to split the string `S`.

### Conditional Type Logic
The type uses **template literal types** and recursive type inference to repeatedly split the string `S` based on the separator `SEP`.
```ts
S extends `${infer R}${SEP}${infer T}`
```
This part checks if the string `S` can be decomposed into three parts:

* `R`: a portion of the string before the first occurrence of the separator `SEP`.
* `SEP`: the separator itself.
* `T`: the rest of the string after the separator.

If this pattern holds, the type returns an array with `R` as the first element and recursively calls `Split<T, SEP>` on the remaining part (`T`) of the string, continuing the split operation. The result of the recursive split is added into the array using the spread operator `...Split<T, SEP>`.

### Base Cases
1. **Empty String**:
   ```ts
   S extends ""
   ? []
   ```
   If the string `S` is empty, return an empty array `[]`. This is the base case for recursion.


2. **Generic String Type**:
   ```ts
   string extends S
   ? string[]
   ```
   If `S` is a generic `string` type (e.g., not a specific literal string), return `string[]` because the string could be anything.


3. **Single String**:
   ```ts
   : [S];
   ```
   If none of the above conditions are met, return `[S]`, meaning `S` is a string that does not contain the separator `SEP`, and it forms a single-element array.

### Summary of Usage
This `Split` type takes a string `S` and a separator `SEP` and recursively splits `S` into an array of substrings at every occurrence of `SEP`. It's a **type-level string manipulation** function that can be used in situations where you need to perform compile-time splitting of strings.

### Example Usage
```ts
type Result = Split<"apple,banana,grape", ",">;
// Result will be: ["apple", "banana", "grape"]

type AnotherResult = Split<"hello-world-typescript", "-">;
// AnotherResult will be: ["hello", "world", "typescript"]

type NoSeparator = Split<"singleword", ",">;
// NoSeparator will be: ["singleword"]

type EmptyString = Split<"", ",">;
// EmptyString will be: []
```
### Practical Usage
* **String manipulation at the type level**: Useful for manipulating string literals in types (e.g., splitting domain-specific strings, like `URLs` or file paths).
* **Validation of string formats**: Helps validate and process types for cases like parsing or transforming based on separator logic.
