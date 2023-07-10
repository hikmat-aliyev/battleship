import Ship from "./ship";

export default function Gameboard() {
    const boardSize = 10;
    const board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
    const ships = [];

    function placeShip(shipLength, rowStart, columnStart, isVertical) {
        const ship = Ship(shipLength);
        ships.push(ship);

        if(isValidPlacement(shipLength, rowStart, columnStart, isVertical) === false) {
            return false;
        }

        if(isVertical){
            for(let i = 0; i < shipLength; i++) {
                board[rowStart + i][columnStart] = ship;
            }
        }else {
            for(let i = 0; i < shipLength; i++){
                board[rowStart][columnStart + i] = ship;
            }
        }
        return true;
    }

    function isValidPlacement(shipLength, rowStart, columnStart, isVertical) {
        let rowEnd;
        let columnEnd;
        
        if(isVertical) {
            rowEnd = rowStart + shipLength;
            columnEnd = columnStart;
        } else {
            rowEnd = rowStart;
            columnEnd = columnStart + shipLength;
        }

        // Check if ship is within the bounds of the board
        if (
            rowStart < 0 ||
            rowStart >= boardSize ||
            columnStart < 0 ||
            columnStart >= boardSize ||
            rowEnd < 0 ||
            rowEnd >= boardSize ||
            columnEnd < 0 ||
            columnEnd >= boardSize
          ) {
            return false;
          }

          // Check if any coordinates are already occupied by a ship
          if(board[rowStart][columnStart] !== null ||
             board[rowEnd][columnEnd] !== null
            ) {
                return false;
            }
            return true;

    }

    function receiveAttack(row, column) {
        //if the element is null, it's missed shot, change it to 0
        if(board[row][column] === null) {
            board[row][column] = 0;
        //if element is already hit
        } else if(board[row][column] === 0 || board[row][column] === 1){
            return false;
        } else {
            board[row][column].hit();
        }
    }

    return {
        placeShip,
        receiveAttack,
        board: board
    }
}