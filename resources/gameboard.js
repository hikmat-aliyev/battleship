import Ship from "./ship";

export default function Gameboard() {
    const boardSize = 10;
    const board = new Array(boardSize * boardSize).fill(null);
    const ships = [];
  
    function placeShip(shipLength, coordinates) {
      const ship = Ship(shipLength);

      if (!isValidPlacement(ship, coordinates)) {
        return false;
      }
  
      coordinates.forEach((coordinate) => {
        const [row, col] = coordinate;
        const index = row * boardSize + col;
        board[index] = ship;
      });
  
      ships.push(ship);
      return true;
    }
  
    function isValidPlacement(ship, coordinates) {
      const [rowStart, colStart] = coordinates[0];
      const [rowEnd, colEnd] = coordinates[coordinates.length - 1];
  
      // Check if ship is within the bounds of the board
      if (
        rowStart < 0 ||
        rowStart >= boardSize ||
        colStart < 0 ||
        colStart >= boardSize ||
        rowEnd < 0 ||
        rowEnd >= boardSize ||
        colEnd < 0 ||
        colEnd >= boardSize
      ) {
        return false;
      }
  
      // Check if any coordinates are already occupied by a ship
      for (let i = 0; i < coordinates.length; i++) {
        const [row, col] = coordinates[i];
        const index = row * boardSize + col;
        if (board[index] !== null) {
          return false;
        }
      }
  
      return true;
    }
  
    // Other Gameboard methods...
  
    return {
      placeShip,
      // Other Gameboard methods...
    };
  }
  