/**
 * Variables and types
 */
let age = 6; //Type number
const cAge = 6; //Type 6 - immutable value type (can't be modified)

function add0(a, b) {
  return a + b; //No typed variables or reutrn type so all of them are type of :any
}

function typedAdd(a: number, b: number): number {
  //Explicit return type
  return a + b;
}

/**
 * Object types tuples
 */

let car: {
  make: string;
  model: string;
  year: number;
};

function printCar(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number;
}): void {
  let str = `${car.make} ${car.model} ${car.year}`;

  if (typeof car.chargeVoltage !== "undefined") {
    str += `// ${car.chargeVoltage}v`;
  }

  console.log(str);
}

/**
 * Dictionaries
 */

const phones = {
  home: { country: "+1", area: "211", number: "652-4515" },
  work: { country: "+1", area: "670", number: "752-5856" },
  fax: { country: "+1", area: "322", number: "525-4357" },
};

// Index signature
const phones_index: {
  [k: string]: {
    country: string;
    area: string;
    number: string;
  };
} = {};

/** Tuples */
//Sometimes we may want to work with a multi-element,
//ordered data structure, where position of each item has some special meaning or convention.
//This kind of structure is often called a tuple.

//          [Year, Make,     Model    ]
let myCar = [2002, "Toyota", "Corolla"];
// destructured assignment is convenient here!
const [year, make, model] = myCar;

let myCarTyped: [number, string, string] = [2002, "Toyota", "Corolla"];

//There is no tuple length check when we us arr.push() so there won't be an error about length constraints

/** Structural / Shape type system */
class Car {
  make: string;
  model: string;
  year: number;
  isElectric: boolean;
}

class Truck {
  make: string;
  model: string;
  year: number;
  towingCapacity: number;
}

const vehicle = {
  make: "Honda",
  model: "Accord",
  year: 2017,
};

//anonymous class
function printCar3(car: { make: string; model: string; year: number }) {
  console.log(`${car.make} ${car.model} (${car.year})`);
}

printCar3(new Car()); // Fine
printCar3(new Truck()); // Fine
printCar3(vehicle); // Fine
//The function printCar doesn’t care about which constructor its argument came from, it only cares about whether it has:
//A make property that’s of type string
//A model property that’s of type string
//A year property that’s of type number

//“Duck typing” gets its name from the “duck test”.
//“If it looks like a duck, swims like a duck, and quacks like a duck, then it’s probably is a duck”.
//In practice, this is very similar to structural typing, but “Duck typing” is usually used to describe dynamic type systems.

/**Union and Intersection Types
 * A union type has a very specific technical definition that comes from set theory, but it’s completely fine to think of it as OR, for types.
 * Intersection types also have a name and definition that comes from set theory, but they can be thought of as AND, for types.
 *
 * "success" | "error"
 *  Date & { end: Date }
 *
 * Type Guards: typeOf <<value>> - we can determine at runtime which type is the value / instanceOf <<class>>
 */

function maybeGetUserInfo():
  | ["error", Error]
  | ["success", { name: string; email: string }] {
  if (Math.random() > 0.5) {
    return ["success", { name: "Mike North", email: "mike@example.com" }];
  } else {
    return ["error", new Error("The coin landed on TAILS :(")];
  }
}
/// Discriminated Unions
const outcome = maybeGetUserInfo();
if (outcome[0] === "error") {
  // In this branch of your code, second is an Error
  outcome;
  // ^?
} else {
  // In this branch of your code, second is the user info
  outcome;
}

//Intersection type
//It mashes to the Date object additional property - end
function makeWeek(): Date & { end: Date } {
  //⬅ return type

  const start = new Date();
  const end = new Date(start.valueOf() + ONE_WEEK);

  return { ...start, end }; // kind of Object.assign
}

/**
 * Interfaces and Type Aliases
 */
//Type alias
export type UserContactInfo = {
  name: string;
  email: string;
};

type UserInfoOutcomeError = ["error", Error];
type UserInfoOutcomeSuccess = ["success", { name: string; email: string }];
type UserInfoOutcome = UserInfoOutcomeError | UserInfoOutcomeSuccess;

/**
 * CLEANED UP version
 */
export function maybeGetUserInfoCleaned(): UserInfoOutcome {
  // implementation is the same in both examples
  if (Math.random() > 0.5) {
    return ["success", { name: "Mike North", email: "mike@example.com" }];
  } else {
    return ["error", new Error("The coin landed on TAILS :(")];
  }
}

//An interface is a way of defining an object type. An “object type” can be thought of as, “an instance of a class could conceivably look like this”.

/**
 * Functions
 */

//Callable types
interface TwoNumberCalculation {
  (x: number, y: number): number;
}

type TwoNumberCalc = (x: number, y: number) => number;
const add: TwoNumberCalculation = (a, b) => a + b;
const subtract: TwoNumberCalc = (x, y) => x - y;

function invokeInFourSeconds(callback: () => undefined) {
  setTimeout(callback, 4000);
}
function invokeInFiveSeconds(callback: () => void) {
  setTimeout(callback, 5000);
}

const values: number[] = [];
invokeInFourSeconds(() => values.push(4));
//Type 'number' is not assignable to type 'undefined'.
invokeInFiveSeconds(() => values.push(4));

// Function overload use case:
type FormSubmitHandler = (data: FormData) => void;
type MessageHandler = (evt: MessageEvent) => void;

function handleMainEvent(elem: HTMLFormElement, handler: FormSubmitHandler);
function handleMainEvent(elem: HTMLIFrameElement, handler: MessageHandler);
function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler
) {}

const myFrame = document.getElementsByTagName("iframe")[0];

const myForm = document.getElementsByTagName("form")[0];

handleMainEvent(myFrame, (val) => {});
handleMainEvent(myForm, (val) => {});

/**
 * Classes
 */

class Car2 {
  make: string;
  model: string;
  year: number;
  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}
//Car2 is equal to Car3 (in accessing to its properties)
class Car3 {
  constructor(public make: string, public model: string, public year: number) {}
}

class Base {}

class Car5 extends Base {
  foo = console.log("class field initializer");
  constructor(public make: string) {
    super();
    console.log("custom constructor stuff");
  }
}
//JS OUTOUT:
//class Base {}
//class Car extends Base {
//  constructor(make) {
//   super();
//   this.make = make;
//   this.foo = console.log("class field initializer");
//   console.log("custom constructor stuff");
//  }
//}

/**
 * Top and Bottom Types
 */
//A top type (symbol: ⊤) is a type that describes any possible value allowed by the system.
//To use our set theory mental model, we could describe this as {x| x could be anything }

//Top Type Any - risk of runtimes error (no type safety)
let flexible: any = 4;
flexible = "Download some more ram";
flexible = window.document;
flexible = setTimeout;

//Top Type Unknown - you can assign the value but cannot accesss to it directly (need to check or cast as specified type)
let myUnknown: unknown = 14;
myUnknown.it.is.possible.to.access.any.deep.property;
//'myUnknown' is of type 'unknown'.

// This code runs for { myUnknown| anything }
if (typeof myUnknown === "string") {
  // This code runs for { myUnknown| all strings }
  console.log(myUnknown, "is a string");
} else if (typeof myUnknown === "number") {
  // This code runs for { myUnknown| all numbers }
  console.log(myUnknown, "is a number");
} else {
  // this would run for "the leftovers"
  //       { myUnknown| anything except string or numbers }
}

function doSomethingRisky() {
  if (Math.random() > 0.5) return "ok";
  else if (Math.random() > 0.5) throw new Error("Bad luck!");
  else throw "Really bad luck";
}

try {
  doSomethingRisky();
} catch (e: unknown) {
  if (e instanceof Error) {
    e;
  } else if (typeof e === "string") {
    e;
  } else {
    // Last resort
    console.error(e);
  }
}

// ALMOST TOP TYPE - Object
//The object type represents the set { all possible values except for primitives }.
//Primitive value types in JavaScript are { string, number, boolean, Symbol, null, undefined, BigInt }
//((IN TS WHEN STRICKTnULLcHECKS IS SET TO FALSE THEN NULL VALUES CAN BE ASSIGNED AS AN OBJECT))
let val: object = { status: "ok" };
val = "foo";
val = null;
val = () => "ok";

// The type of this value cannot be modeled by an interface
let response:
  | { success: string; data: unknown }
  | { error: string; code: number } = { success: "ok", data: [] };

val = response;

// ALMOST TOP TYPE - {}
const stringOrNumber: string | number = 4;
let nullableString: string | null = null;
const myObj: {
  a?: number;
  b: string;
} = { b: "foo" };

let val2: {} = 4;
val2 = "abc";
val2 = new Date();
val2 = stringOrNumber;
val2 = nullableString; //error - null
val2 = myObj.a; //error cause of possible undefined

//A bottom type (symbol: ⊥) is a type that describes no possible value allowed by the system.
//To use our set theory mental model, we could describe this as “any value from the following set: { } (intentionally empty)”
//Exhaustive conditionals:
class Car11 {
  drive() {
    console.log("vroom");
  }
}
class Truck11 {
  tow() {
    console.log("dragging something");
  }
}
class Boat {
  isFloating() {
    return true;
  }
}
type Vehicle = Truck | Car | Boat;

let myVehicle: Vehicle = obtainRandomVehicle();

// The exhaustive conditional
if (myVehicle instanceof Truck11) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof Car11) {
  myVehicle.drive(); // Car
} else {
  // NEITHER!
  const neverValue: never = myVehicle;
  //Type 'Boat' is not assignable to type 'never'.
}

/**
 * TypeGuards
 */

interface CarLike {
  make: string;
  model: string;
  year: number;
}

let maybeCar: unknown;

// the guard
function isCarLike(valueToTest: any): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  );
}

// the guard
function assertsIsCarLike(valueToTest: any): asserts valueToTest is CarLike {
  if (
    !(
      valueToTest &&
      typeof valueToTest === "object" &&
      "make" in valueToTest &&
      typeof valueToTest["make"] === "string" &&
      "model" in valueToTest &&
      typeof valueToTest["model"] === "string" &&
      "year" in valueToTest &&
      typeof valueToTest["year"] === "number"
    )
  )
    throw new Error(`Value does not appear to be a CarLike${valueToTest}`);
}

if (isCarLike(maybeCar)) {
  maybeCar;
  //let maybeCar: CarLike
}

// using the guard
maybeCar;
//let maybeCar: unknown

assertsIsCarLike(maybeCar);
maybeCar;
//let maybeCar: CarLike

/**
 * Generics
 */
function listToDict<T>(
  list: T[],
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {};

  list.forEach((element) => {
    const dictKey = idGen(element);
    dict[dictKey] = element;
  });

  return dict;
}

const dict1 = listToDict(
  [{ name: "Mike" }, { name: "Mark" }],
  (item) => item.name
);

const phoneList = [
  { customerId: "0001", areaCode: "321", num: "123-4566" },
  { customerId: "0002", areaCode: "174", num: "142-3626" },
  { customerId: "0003", areaCode: "192", num: "012-7190" },
  { customerId: "0005", areaCode: "402", num: "652-5782" },
  { customerId: "0004", areaCode: "301", num: "184-8501" },
];

const dict2 = listToDict(phoneList, (p) => p.customerId);

/**
 * Dictionary map, reduce, filter
 */

const fruits = {
  apple: { color: "red", mass: 100 },
  grape: { color: "red", mass: 5 },
  banana: { color: "yellow", mass: 183 },
  lemon: { color: "yellow", mass: 80 },
  pear: { color: "green", mass: 178 },
  orange: { color: "orange", mass: 262 },
  raspberry: { color: "red", mass: 4 },
  cherry: { color: "red", mass: 5 },
};

interface Dict<T> {
  [k: string]: T;
}

// Array.prototype.map, but for Dict
function mapDict<T, U>(
  input: Dict<T>,
  mapping: (arg: T, key: string) => U
): Dict<U> {
  const toReturn: Dict<U> = {};

  for (let key in input) {
    const thisVal = input[key];
    toReturn[key] = mapping(thisVal, key);
  }

  return toReturn;
}
// Array.prototype.filter, but for Dict
function filterDict<T>(input: Dict<T>, filter: (arg: T) => boolean): Dict<T> {
  const toReturn: Dict<T> = {};

  for (let key in input) {
    const thisVal = input[key];
    if (filter(thisVal)) {
      toReturn[key] = thisVal;
    }
  }

  return toReturn;
}
// Array.prototype.reduce, but for Dict
function reduceDict<T, V>(
  input: Dict<T>,
  reducer: (currentValue: V, item: T) => V,
  initialValue: V
): V {
  let valToReturn = initialValue;

  for (let key in input) {
    const thisVal = input[key];
    valToReturn = reducer(valToReturn, thisVal);
  }

  return valToReturn;
}

// MAP
const fruitsWithKgMass = mapDict(fruits, (fruit, name) => ({
  ...fruit,
  kg: 0.001 * fruit.mass,
  name,
}));

// FILTER
// only red fruits
const redFruits = filterDict(fruits, (fruit) => fruit.color === "red");

// REDUCE
// If we had one of each fruit, how much would the total mass be?
const oneOfEachFruitMass = reduceDict(
  fruits,
  (currentMass, fruit) => currentMass + fruit.mass,
  0
);

/**
 * Extract utility
 */

type FavoriteColors =
  | "dark sienna"
  | "van dyke brown"
  | "yellow ochre"
  | "sap green"
  | "titanium white"
  | "phthalo green"
  | "prussian blue"
  | "cadium yellow"
  | [number, number, number]
  | { red: number; green: number; blue: number };

type StringColors = Extract<FavoriteColors, string>;

type ObjectColors = Extract<FavoriteColors, { red: number }>;

type TupleColors = Extract<FavoriteColors, [number, number, number]>;

//EXclude
type NonStringColors = Exclude<FavoriteColors, string>;

/**
 * Covariance and contravariance
 */
class Snack {
  protected constructor(public readonly petFriendly: boolean) {}
}

class Pretzel extends Snack {
  constructor(public readonly salted = true) {
    super(!salted);
  }
}

class Cookie extends Snack {
  public readonly petFriendly: false = false;
  constructor(public readonly chocolateType: "dark" | "milk" | "white") {
    super(false);
  }
}

//Covariance - from sub to base
interface Producer<T> {
  produce: () => T;
}
//or
interface Producer<out T> {
  produce: () => T;
}

let cookieProducer: Producer<Cookie> = {
  produce: () => new Cookie("dark"),
};

const COOKIE_TO_PRETZEL_RATIO = 0.5;

let snackProducer: Producer<Snack> = {
  produce: () =>
    Math.random() > COOKIE_TO_PRETZEL_RATIO
      ? new Cookie("milk")
      : new Pretzel(true),
};

snackProducer = cookieProducer; // ✅
cookieProducer = snackProducer; // ❌

//Cookie	          --- is a --->	  Snack
//Producer<Cookie>	--- is a --->	  Producer<Snack>

//contravariance - from base to sub
interface Packager<T> {
  package: (item: T) => void;
}
//or
interface Packager<in T> {
  package: (item: T) => void;
}

let cookiePackager: Packager<Cookie> = {
  package(item: Cookie) {},
};

let snackPackager: Packager<Snack> = {
  package(item: Snack) {
    if (item instanceof Cookie) {
      /* Package cookie */
    } else if (item instanceof Pretzel) {
      /* Package pretzel */
    } else {
      /* Package other snacks? */
    }
  },
};

cookiePackager = snackPackager;
snackPackager = cookiePackager;

//Cookie	           --- is a --->	  Snack
//Packager<Cookie>	<--- is a ---	    Packager<Snack>

//Invariance
interface ProducerPackager<T> {
  package: (item: T) => void;
  produce: () => T;
}

let cookieProducerPackager: ProducerPackager<Cookie> = {
  produce() {
    return new Cookie("dark");
  },
  package(arg: Cookie) {},
};

let snackProducerPackager: ProducerPackager<Snack> = {
  produce() {
    return Math.random() > 0.5 ? new Cookie("milk") : new Pretzel(true);
  },
  package(item: Snack) {
    if (item instanceof Cookie) {
      /* Package cookie */
    } else if (item instanceof Pretzel) {
      /* Package pretzel */
    } else {
      /* Package other snacks? */
    }
  },
};

//Cookie	                  --- is a --->	      Snack
//ProducerPackager<Cookie>	x x x x x x	        ProducerPackager<Snack>

//Bivariance (not desirable)
function cookieQualityCheck(cookie: Cookie): boolean {
  return Math.random() > 0.1;
}

function snackQualityCheck(snack: Snack): boolean {
  if (snack instanceof Cookie) return cookieQualityCheck(snack);
  else return Math.random() > 0.16; // pretzel case
}

// A function type for preparing a bunch of food items
// for shipment. The function must be passed a callback
// that will be used to check the quality of each item.
type PrepareFoodPackage<T> = (
  uncheckedItems: T[],
  qualityCheck: (arg: T) => boolean
) => T[];

// Prepare a bunch of snacks for shipment
let prepareSnacks: PrepareFoodPackage<Snack> = (uncheckedItems, callback) =>
  uncheckedItems.filter(callback);

// Prepare a bunch of cookies for shipment
let prepareCookies: PrepareFoodPackage<Cookie> = (uncheckedItems, callback) =>
  uncheckedItems.filter(callback);

const cookies = [new Cookie("dark"), new Cookie("milk"), new Cookie("white")];
const snacks = [new Pretzel(true), new Cookie("milk"), new Cookie("white")];
//Below works when strictFunctionTypes = false
prepareSnacks(cookies, cookieQualityCheck);
prepareSnacks(snacks, cookieQualityCheck);
prepareCookies(cookies, snackQualityCheck);

/**
 * Template literal types
 */

type Statistics = {
  [K in `${"median" | "mean"}Value`]?: number;
};
const stats: Statistics = {};
stats.meanValue;
stats.medianValue;

let winFns: Extract<keyof Window, `set${any}`> = "" as any;
type T1 = `send${Capitalize<"mouse" | "keyboard">}Event`;
type T2 = `send${Uppercase<"mouse" | "keyboard">}Event`;
type T3 = `send${Lowercase<"Mouse" | "keyBoard">}Event`;

/**
 * Key remapping
 */

type Colors = "red" | "green" | "blue";
type ColorSelector = {
  [K in Colors as `select${Capitalize<K>}`]: () => void;
};
const cs: ColorSelector = {} as any;
cs.selectRed();
cs.selectBlue();
cs.selectGreen();


/**
 * Checked index access
 */
type Dict10<T> = { [K: string]: T }
type Dict10U<T> = { [K: string]: T | undefined }
const d: Dict10<string[]> = {}
const dd: Dict10U<string[]> = {}
d.rhubarb.join(", ") // 💥
dd.rhubarb.join(", ") 

let aage =13
aage = Number.NaN
