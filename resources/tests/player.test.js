import Gameboard from "../gameboard";
import Player from "../player";
import Ship from "../ship";


it("dasda", () => {
    expect(1).toBe(1)
});

it("computer attacks properly", () => {
    const ship = Ship(3);
    const computerGameboard = Gameboard();
    computerGameboard.placeShip(ship.length, 1, 2, true);
    const human = Player('human');
    human.humanAttack(computerGameboard, 1, 2);
    expect(human.humanAttack(computerGameboard, 1, 2)).toBe(false);
})