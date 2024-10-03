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
export { banana, Fruit };

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

export { Fruit };
