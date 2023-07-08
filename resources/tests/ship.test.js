const Ship = require("../resources/ship")


describe("Ship", () => {
    it("has correct hit method", () => {
      const ship1 = Ship(3);
      expect(ship1.hit()).toBe(1);
    });
});

describe("Ship", () => {
  it("has correct isSunk method", () => {
    const ship1 = Ship(3);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
  });
});


describe("Ship", () => {
    it("has correct isSunk method", () => {
      const ship1 = Ship(3);
      ship1.hit();
      ship1.hit();
      ship1.hit();
      expect(ship1.isSunk()).toBe(true);
    });
});
  


