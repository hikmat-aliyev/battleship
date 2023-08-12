import Gameboard from "./gameboard";
import Player from "./player";

let lengthOfShip = 5;

function game() {
    
    let humanBoard = Gameboard('human');
    let human = Player('humanPlayer');
    let computer = Player('computerPlayer');
    const humanDivContainer = document.getElementById("humanBoard");
    renderBoards(humanBoard, humanDivContainer);

    let computerBoard = Gameboard('computer');
    const computerDivContainer = document.getElementById("computerBoard");
    renderBoards(computerBoard, computerDivContainer);

    computerDivContainer.addEventListener('mouseover', () => {
        computerDivContainer.classList.add('attack-cursor');
    });

    const humanSquares = document.querySelectorAll(".human-square");
    const computerSquares = document.querySelectorAll(".computer-square");

    const modal = document.querySelector(".game-over-modal");
    const backdrop = document.querySelector(".backdrop");
    //game loop
    computerSquares.forEach(square => {
        square.addEventListener("click", () => {
            if(!computerBoard.isAllShipsSunk() && !humanBoard.isAllShipsSunk() && humanBoard.ships.length === 4
            && !square.classList.contains("ship-attacked") && !square.classList.contains("null-attacked")){
                const row = square.row;
                const column = square.column;
                human.humanAttack(computerBoard, row, column);
                computer.computerAttack(humanBoard, humanSquares);
                if(square.classList.contains("computer-ship")) {
                    square.classList.add("ship-attacked");
                    square.innerHTML = "&#183"
                }
                else {
                    square.classList.add("null-attacked");
                }
                if(computerBoard.isAllShipsSunk() || humanBoard.isAllShipsSunk()){
                    modal.classList.add("visible");
                    backdrop.classList.add("visible");
                } 
            }
        })
    })  

    let isVertical = true;
    const verticalButton = document.getElementById("isVertical");
    verticalButton.addEventListener("click", () => {
        isVertical = !isVertical;
        verticalButton.textContent = isVertical ? "Vertical" : "Horizontal";
    })

    humanSquares.forEach(square => {
        square.addEventListener("mouseover", () => {
            showShadowsOfShip(square, humanSquares, isVertical);
        });
        square.addEventListener("click", () => {
            settleShipsOnBoard(humanBoard, isVertical, square, humanSquares);   
        })
    });

    humanDivContainer.addEventListener("mouseleave", () => {
        humanSquares.forEach(square => {
            if (square.classList.contains("mouseover-ship")) {
                square.classList.remove("mouseover-ship");
            }
        });
    });


    const startAgainButton = document.querySelector(".start-again-button")
    startAgainButton.addEventListener("click", () => {
        while(humanDivContainer.firstChild){
            humanDivContainer.removeChild(humanDivContainer.firstChild);
            computerDivContainer.removeChild(computerDivContainer.firstChild);
        }
        lengthOfShip = 5;
        modal.classList.remove("visible");
        backdrop.classList.remove("visible"); 
        game();
    })

}


function renderBoards(gameBoard, divContainer) {

    if(gameBoard.name === 'computer') {
        gameBoard.placeComputerShips();
    }
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const div = document.createElement("div");
            divContainer.appendChild(div);
            if(gameBoard.name === "human"){
             div.classList.add("human-square");
            } else {
                if(gameBoard.board[i][j] !== null) div.classList.add("computer-ship");
                div.classList.add("computer-square");
            };
            div.row = i;
            div.column = j;
        }
    }
}

function showShadowsOfShip(square, squares, isVertical) {
    if (isVertical && lengthOfShip >= 2 && lengthOfShip <= 5) {
        square.classList.toggle("mouseover-ship");
        squares.forEach(otherSquare => {
            const partOfShip = otherSquare.row >= square.row && otherSquare.row < square.row + lengthOfShip && otherSquare.column === square.column ;
            otherSquare.classList.toggle("mouseover-ship", partOfShip);
        });
    } else if(lengthOfShip >= 2 && lengthOfShip <= 5) {
        square.classList.toggle("mouseover-ship");
        squares.forEach(otherSquare => {
            const partOfShip = otherSquare.column >= square.column && otherSquare.column < square.column + lengthOfShip && otherSquare.row === square.row ;
            otherSquare.classList.toggle("mouseover-ship", partOfShip);
        });
    }
}

function settleShipsOnBoard(board, isVertical, square, squares) {
    if(lengthOfShip <= 5 && lengthOfShip >= 2){
        const rowStart = square.row;
        const columnStart = square.column;
        if(board.isValidPlacement(lengthOfShip, rowStart, columnStart, isVertical)){
            board.placeShip(lengthOfShip, rowStart, columnStart, isVertical);
            squares.forEach(square => {
                if(square.classList.contains("mouseover-ship")) square.classList.toggle("ship")
            });
            lengthOfShip--;
        }
    }
}



game();