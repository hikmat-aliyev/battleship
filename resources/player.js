import Gameboard from "./gameboard"

export default function Player(name) {

    const player = {
        name: name,
    };

    function computerAttack(gameboard) {
        const randomRow = Math.floor(Math.random() * 11);
        const randomColumn = Math.floor(Math.random() * 11);
        if(gameboard[randomRow][randomColumn].hasBeenAttacked()) computerAttack(gameboard);
        gameboard.receiveAttack(randomRow, randomColumn);
    }

    function humanAttack(gameboard, row, column) {
        if(gameboard.hasBeenAttacked(row, column)) return false;
        gameboard.receiveAttack(row, column);
    }

    return {
        computerAttack,
        humanAttack
    }
}