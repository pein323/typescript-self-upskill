/**
 * Variables and types
 */
let age = 6; //Type number
const cAge = 6; //Type 6 - immutable value type (can't be modified)

function add(a, b) {
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
    str += `// ${car.chargeVoltage}`;
  }

  console.log(str);
}
