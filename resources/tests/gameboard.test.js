import Gameboard from "../gameboard"
import Ship from "../ship"


it("works",  () => {
    expect(1).toBe(1)
})

describe("Gameboard", () => {
    it("places ship correctly", () => {
        const gameboard = Gameboard('human');
        expect(gameboard.placeShip(3, 1, 2, true)).toBe(true);
    })

    it("places ship correctly", () => {
        const gameboard = Gameboard();
        gameboard.placeShip(3, 1, 2, true);
        expect(gameboard.placeShip(3, 1, 2, true)).toBe(false);
    })

    it("places ship correctly", () => {
        const gameboard = Gameboard();
        gameboard.placeShip(3, 1, 2, true);
        expect(gameboard.placeShip(5, 2, 3, true)).toBe(true);
    })

    it("receives attack correctly",() => {
        const gameboard = Gameboard();
        gameboard.placeShip(3, 1, 2, true);
        gameboard.receiveAttack(1, 2);
        expect(gameboard.board[1][2].hit()).toBe(2);
    })

    it("receives attack correctly",() => {
        const gameboard = Gameboard();
        gameboard.placeShip(3, 1, 2, true);
        gameboard.receiveAttack(1, 2);
        gameboard.receiveAttack(2, 2);
        expect(gameboard.board[1][2].hit()).toBe(3);
    })

    it("reports if all ships are sunk or not correctly", () => {
        const gameboard = Gameboard();
        gameboard.placeShip(3, 1, 2, true);
        gameboard.receiveAttack(1, 2);
        expect(gameboard.isAllShipsSunk()).toBe(false);
    })

    it("reports if all ships are sunk or not correctly", () => {
        const gameboard = Gameboard();
        gameboard.placeShip(3, 1, 2, true);
        gameboard.receiveAttack(1, 2);
        gameboard.receiveAttack(2, 2);
        gameboard.receiveAttack(3, 2);
        expect(gameboard.isAllShipsSunk()).toBe(true);
    })

    it("checks if the coordinate has been attacked", () => {
        const gameboard = Gameboard();
        gameboard.placeShip(3, 1, 2, true);
        gameboard.receiveAttack(1, 2);
        expect(gameboard.hasBeenAttacked(1, 2)).toBe(true);
    })

    it("checks if the coordinate has been attacked", () => {
        const gameboard = Gameboard();
        gameboard.placeShip(3, 1, 2, true);
        gameboard.receiveAttack(1, 2);
        gameboard.receiveAttack(2, 2);
        expect(gameboard.hasBeenAttacked(0, 2)).toBe(false);
    })
})

