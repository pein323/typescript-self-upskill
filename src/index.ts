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
let flexible: any = 4
flexible = "Download some more ram"
flexible = window.document
flexible = setTimeout

//Top Type Unknown - you can assign the value but cannot accesss to it directly (need to check or cast as specified type)
let myUnknown: unknown = 14
myUnknown.it.is.possible.to.access.any.deep.property
//'myUnknown' is of type 'unknown'.
          
// This code runs for { myUnknown| anything }
if (typeof myUnknown === "string") {
  // This code runs for { myUnknown| all strings }
  console.log(myUnknown, "is a string")
                 
} else if (typeof myUnknown === "number") {
  // This code runs for { myUnknown| all numbers }
  console.log(myUnknown, "is a number")
                 
} else {
  // this would run for "the leftovers"
  //       { myUnknown| anything except string or numbers }
}

//A bottom type (symbol: ⊥) is a type that describes no possible value allowed by the system. 
//To use our set theory mental model, we could describe this as “any value from the following set: { } (intentionally empty)”
//Exhaustive conditionals:
class Car11 {
  drive() {
    console.log("vroom")
  }
}
class Truck11 {
  tow() {
    console.log("dragging something")
  }
}
class Boat {
  isFloating() {
    return true
  }
}
type Vehicle = Truck | Car | Boat
 
let myVehicle: Vehicle = obtainRandomVehicle()
 
// The exhaustive conditional
if (myVehicle instanceof Truck11) {
  myVehicle.tow() // Truck
} else if (myVehicle instanceof Car11) {
  myVehicle.drive() // Car
} else {
  // NEITHER!
  const neverValue: never = myVehicle
  //Type 'Boat' is not assignable to type 'never'.
}

/**
 * TypeGuards
 */

interface CarLike {
  make: string
  model: string
  year: number
}
 
let maybeCar: unknown

// the guard
function isCarLike(
  valueToTest: any
): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  )
}


 
// the guard
function assertsIsCarLike(
  valueToTest: any
): asserts valueToTest is CarLike {
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
    throw new Error(
      `Value does not appear to be a CarLike${valueToTest}`
    )
}

if (isCarLike(maybeCar)) {
  maybeCar
  //let maybeCar: CarLike
}
 
// using the guard
maybeCar
//let maybeCar: unknown

assertsIsCarLike(maybeCar)
maybeCar   
//let maybeCar: CarLike