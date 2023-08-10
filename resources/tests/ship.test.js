import Ship from "../ship";

describe("Ship", () => {
  it("has correct hit method", () => {
    const ship1 = Ship(3);
    expect(ship1.hit()).toBe(1);
  });

  it("has correct isSunk method", () => {
    const ship1 = Ship(3);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
  });

  it("has correct isSunk method when ship is sunk", () => {
    const ship1 = Ship(3);
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);
  });

  it("has correct hit method", () => {
    const ship1 = Ship(3);
    ship1.hit();
    expect(ship1.hit()).toBe(2);
  });
});

module.exports = Ship;