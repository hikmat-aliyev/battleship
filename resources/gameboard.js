import Ship from "./ship";

export default function Gameboard(name) {
    const boardSize = 10;
    const board = Array.from({ length: 10 }, () => Array(10).fill(null));
    const ships = [];

    function placeShip(shipLength, rowStart, columnStart, isVertical) {

        if(!isValidPlacement(shipLength, rowStart, columnStart, isVertical)) {
            return false;
        }else {
            const ship = Ship(shipLength);
            ships.push(ship);
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

        
    }

    function isValidPlacement(shipLength, rowStart, columnStart, isVertical) {
        let rowEnd;
        let columnEnd;
        
        if(isVertical) {
            rowEnd = rowStart + shipLength - 1;
            columnEnd = columnStart;
        } else {
            rowEnd = rowStart;
            columnEnd = columnStart + shipLength - 1;
        }

        // Check if ship is within the bounds of the board
        if (
            rowStart < 0 ||
            rowStart >= boardSize ||
            columnStart < 0 ||
            columnStart >= boardSize ||
            rowEnd < 0 ||
            rowEnd > boardSize ||
            columnEnd < 0 ||
            columnEnd > boardSize
          ) {
            return false;
          }

          for(let i = 0; i < shipLength; i++){
            if(isVertical){
                if(rowStart + i >= boardSize){
                    return false;
                }
            } else {
                if(columnStart + i >= boardSize){
                    return false;
                } 
            }
          }

          // Check if any coordinates and neighbors are already occupied by a ship  
        if (isVertical) {
            for(let i = 0; i < shipLength; i++){
                const nextColumn = columnStart + 1;
                const prevColumn = columnStart - 1;
                if((board[rowStart + i][columnStart] !== null) ||
                    (columnStart === 0 && board[rowStart + i][nextColumn] !== null) ||
                    (columnStart === 9 && board[rowStart + i][prevColumn] !== null) ||
                    ( columnStart > 0 && columnStart < 9 && 
                        (board[rowStart + i][nextColumn] !== null || 
                         board[rowStart + i][prevColumn] !== null)) ||
                    (rowStart === 0 && board[rowEnd + 1][columnStart] !== null) ||
                    (rowEnd === 9 && board[rowStart - 1][columnStart] !== null) ||
                    (rowStart > 0 && rowEnd < 9 &&
                        (board[rowStart - 1][columnStart] !== null ||
                        board[rowEnd + 1][columnStart] !== null))){
                            return false
                         }  
             }
        }else {
            for(let i = 0; i < shipLength; i++){
                const nextRow = rowStart + 1;
                const prevRow = rowStart - 1;
                if(board[rowStart][columnStart + i] !== null ||
                    (rowStart === 0 && board[nextRow][columnStart + i] !== null) || 
                    (rowStart === 9 && board[prevRow][columnStart + i] !== null) ||
                    (rowStart !== 0 && rowStart !== 9 && 
                        (board[nextRow][columnStart + i] !== null || 
                        board[prevRow][columnStart + i] !== null)) ||
                    (columnStart === 0 && board[rowStart][columnEnd + 1] !== null) ||
                    (columnEnd === 9 && board[rowStart][columnStart - 1] !== null) ||
                    (columnStart !== 0 && columnEnd !== 9 &&
                        (board[rowStart][columnStart - 1] !== null ||
                        board[rowStart][columnEnd + 1] !== null))){
                        return false
                }
             }
         }
         return true;

    }
  

    function receiveAttack(row, column) {
        //if the element is null, it's missed shot, change it to 0
        if(board[row][column] === null) {
            board[row][column] = 0;
        //if element is already hit  -- !!! 1 SHOULD BE CHANGED
        } else if(board[row][column] === 0 || board[row][column] === 1){
            return false;
        } else {
            board[row][column].hit();
            board[row][column] = 1;
        }
    }

    function isAllShipsSunk() {
        let sunkShips = 0;
        ships.forEach(ship => {
            if(ship.isSunk()) sunkShips ++;
        }); 
        //CHANGE ship.length to === 4
        if((sunkShips === ships.length) && ships.length === 1) {
            return true;
        }
        else return false;
    }

    function placeComputerShips() {
        const shipSizes = [5, 4, 3, 2];
        let successfulPlacements = 0;
        //change  < 4
        while(successfulPlacements < 1){
            const row = Math.floor(Math.random() * 9)
            const column = Math.floor(Math.random() * 9)
            const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false
            if(this.placeShip(shipSizes[successfulPlacements], row, column, isVertical)){
                successfulPlacements ++;
            }
        }
    }

    function hasBeenAttacked(row, column) {
        if(board[row][column] === 0 || board[row][column] === 1){
            return true;    
        } else return false;
    }


    return {
        placeShip,
        receiveAttack,
        isAllShipsSunk,
        hasBeenAttacked,
        board: board,
        isValidPlacement: isValidPlacement,
        placeComputerShips: placeComputerShips,
        ships: ships,
        name: name,
    }
}
