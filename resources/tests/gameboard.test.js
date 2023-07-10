import Gameboard from "../gameboard"


it("works",  () => {
    expect(1).toBe(1)
})

describe("Gameboard", () => {
    it("places ship correctly", () => {
        const gameboard = Gameboard();
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
})

