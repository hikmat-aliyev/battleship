import Gameboard from "./gameboard"

export default function Player(name) {
    const player = {
        name: name,
    };

    function computerAttack(gameboard, squares) {
        const randomRow = Math.floor(Math.random() * 9);
        const randomColumn = Math.floor(Math.random() * 9);
        if(gameboard.hasBeenAttacked(randomRow, randomColumn)) computerAttack(gameboard, squares);
        gameboard.receiveAttack(randomRow, randomColumn);
        squares.forEach(square => {
            const row = square.row;
            const column = square.column;
            if(randomRow == row && randomColumn == column) {
                if(square.classList.contains("ship")) {
                    square.classList.add("ship-attacked");
                    square.innerHTML = "&#183";
                }else {
                    square.classList.add("null-attacked");
                }
            }
        })
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