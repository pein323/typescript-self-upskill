interface Fruit {
  name: string;
  mass: number;
  color: string;
}

const banana: Fruit = {
  name: "banana",
  color: "yellow",
  mass: 183,
};

// both of these things are exportable
//export { banana, Fruit };

function Fruit(kind: string) {
  switch (kind) {
    case "banana":
      return banana;
    default:
      throw new Error(`fruit type ${kind} not supported`);
  }
}

// the namespace
namespace Fruit {
  function createBanana(): Fruit {
    return Fruit("banana");
  }
}


const is_a_value = 4
type is_a_type = {}
namespace is_a_namespace {
  const foo = 17
}
 
// how to test for a (value | namespace)
const x = is_a_value // the value position (RHS of =).
              
 
// how to test for a type
const y: is_a_type = {} // the type position (LHS of =).
            
// how to test for a namespace (hover over is_a_namespace symbol)
is_a_namespace


export { banana, Fruit };