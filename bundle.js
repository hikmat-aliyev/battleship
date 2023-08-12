/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/gameboard.js":
/*!********************************!*\
  !*** ./resources/gameboard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./resources/ship.js\");\n\n\nfunction Gameboard(name) {\n    const boardSize = 10;\n    const board = Array.from({ length: 10 }, () => Array(10).fill(null));\n    const ships = [];\n\n    function placeShip(shipLength, rowStart, columnStart, isVertical) {\n\n        if(!isValidPlacement(shipLength, rowStart, columnStart, isVertical)) {\n            return false;\n        }else {\n            const ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(shipLength);\n            ships.push(ship);\n            if(isVertical){\n                for(let i = 0; i < shipLength; i++) {\n                    board[rowStart + i][columnStart] = ship;\n                }\n            }else {\n                for(let i = 0; i < shipLength; i++){\n                    board[rowStart][columnStart + i] = ship;\n                }\n            }\n            return true;\n        }\n\n        \n    }\n\n    function isValidPlacement(shipLength, rowStart, columnStart, isVertical) {\n        let rowEnd;\n        let columnEnd;\n        \n        if(isVertical) {\n            rowEnd = rowStart + shipLength - 1;\n            columnEnd = columnStart;\n        } else {\n            rowEnd = rowStart;\n            columnEnd = columnStart + shipLength - 1;\n        }\n\n        // Check if ship is within the bounds of the board\n        if (\n            rowStart < 0 ||\n            rowStart >= boardSize ||\n            columnStart < 0 ||\n            columnStart >= boardSize ||\n            rowEnd < 0 ||\n            rowEnd > boardSize ||\n            columnEnd < 0 ||\n            columnEnd > boardSize\n          ) {\n            return false;\n          }\n\n          for(let i = 0; i < shipLength; i++){\n            if(isVertical){\n                if(rowStart + i >= boardSize){\n                    return false;\n                }\n            } else {\n                if(columnStart + i >= boardSize){\n                    return false;\n                } \n            }\n          }\n\n          // Check if any coordinates and neighbors are already occupied by a ship  \n        if (isVertical) {\n            for(let i = 0; i < shipLength; i++){\n                const nextColumn = columnStart + 1;\n                const prevColumn = columnStart - 1;\n                if((board[rowStart + i][columnStart] !== null) ||\n                    (columnStart === 0 && board[rowStart + i][nextColumn] !== null) ||\n                    (columnStart === 9 && board[rowStart + i][prevColumn] !== null) ||\n                    ( columnStart > 0 && columnStart < 9 && \n                        (board[rowStart + i][nextColumn] !== null || \n                         board[rowStart + i][prevColumn] !== null)) ||\n                    (rowStart === 0 && board[rowEnd + 1][columnStart] !== null) ||\n                    (rowEnd === 9 && board[rowStart - 1][columnStart] !== null) ||\n                    (rowStart > 0 && rowEnd < 9 &&\n                        (board[rowStart - 1][columnStart] !== null ||\n                        board[rowEnd + 1][columnStart] !== null))){\n                            return false\n                         }  \n             }\n        }else {\n            for(let i = 0; i < shipLength; i++){\n                const nextRow = rowStart + 1;\n                const prevRow = rowStart - 1;\n                if(board[rowStart][columnStart + i] !== null ||\n                    (rowStart === 0 && board[nextRow][columnStart + i] !== null) || \n                    (rowStart === 9 && board[prevRow][columnStart + i] !== null) ||\n                    (rowStart !== 0 && rowStart !== 9 && \n                        (board[nextRow][columnStart + i] !== null || \n                        board[prevRow][columnStart + i] !== null)) ||\n                    (columnStart === 0 && board[rowStart][columnEnd + 1] !== null) ||\n                    (columnEnd === 9 && board[rowStart][columnStart - 1] !== null) ||\n                    (columnStart !== 0 && columnEnd !== 9 &&\n                        (board[rowStart][columnStart - 1] !== null ||\n                        board[rowStart][columnEnd + 1] !== null))){\n                        return false\n                }\n             }\n         }\n         return true;\n\n    }\n  \n\n    function receiveAttack(row, column) {\n        //if the element is null, it's missed shot, change it to 0\n        if(board[row][column] === null) {\n            board[row][column] = 0;\n        //if element is already hit  -- !!! 1 SHOULD BE CHANGED\n        } else if(board[row][column] === 0 || board[row][column] === 1){\n            return false;\n        } else {\n            board[row][column].hit();\n            board[row][column] = 1;\n        }\n    }\n\n    function isAllShipsSunk() {\n        let sunkShips = 0;\n        ships.forEach(ship => {\n            if(ship.isSunk()) sunkShips ++;\n        }); \n        //CHANGE ship.length to === 4\n        if((sunkShips === ships.length) && ships.length === 1) {\n            return true;\n        }\n        else return false;\n    }\n\n    function placeComputerShips() {\n        const shipSizes = [5, 4, 3, 2];\n        let successfulPlacements = 0;\n        //change  < 4\n        while(successfulPlacements < 1){\n            const row = Math.floor(Math.random() * 9)\n            const column = Math.floor(Math.random() * 9)\n            const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false\n            if(this.placeShip(shipSizes[successfulPlacements], row, column, isVertical)){\n                successfulPlacements ++;\n            }\n        }\n    }\n\n    function hasBeenAttacked(row, column) {\n        if(board[row][column] === 0 || board[row][column] === 1){\n            return true;    \n        } else return false;\n    }\n\n\n    return {\n        placeShip,\n        receiveAttack,\n        isAllShipsSunk,\n        hasBeenAttacked,\n        board: board,\n        isValidPlacement: isValidPlacement,\n        placeComputerShips: placeComputerShips,\n        ships: ships,\n        name: name,\n    }\n}\n\n\n//# sourceURL=webpack://battleship/./resources/gameboard.js?");

/***/ }),

/***/ "./resources/index.js":
/*!****************************!*\
  !*** ./resources/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./resources/gameboard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./resources/player.js\");\n\n\n\nlet lengthOfShip = 5;\n\nfunction game() {\n    \n    const humanBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('human');\n    const human = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('humanPlayer');\n    const computer = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('computerPlayer');\n    const humanDivContainer = document.getElementById(\"humanBoard\");\n    renderBoards(humanBoard, humanDivContainer);\n\n    const computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('computer');\n    const computerDivContainer = document.getElementById(\"computerBoard\");\n    renderBoards(computerBoard, computerDivContainer);\n\n    computerDivContainer.addEventListener('mouseover', () => {\n        computerDivContainer.classList.add('attack-cursor');\n    });\n\n    const humanSquares = document.querySelectorAll(\".human-square\");\n    const computerSquares = document.querySelectorAll(\".computer-square\");\n\n    const modal = document.querySelector(\".game-over-modal\");\n    const backdrop = document.querySelector(\".backdrop\");\n    //game loop\n    computerSquares.forEach(square => {\n        square.addEventListener(\"click\", () => {\n            if(!computerBoard.isAllShipsSunk() && !humanBoard.isAllShipsSunk() && humanBoard.ships.length === 4\n            && !square.classList.contains(\"ship-attacked\") && !square.classList.contains(\"null-attacked\")){\n                const row = square.row;\n                const column = square.column;\n                human.humanAttack(computerBoard, row, column);\n                computer.computerAttack(humanBoard, humanSquares);\n                if(square.classList.contains(\"computer-ship\")) {\n                    square.classList.add(\"ship-attacked\");\n                    square.innerHTML = \"&#183\"\n                }\n                else {\n                    square.classList.add(\"null-attacked\");\n                }\n                if(computerBoard.isAllShipsSunk() || humanBoard.isAllShipsSunk()){\n                    modal.classList.add(\"visible\");\n                    backdrop.classList.add(\"visible\");\n                } \n            }\n        })\n    })  \n\n    let isVertical = true;\n    const verticalButton = document.getElementById(\"isVertical\");\n    verticalButton.addEventListener(\"click\", () => {\n        isVertical = !isVertical;\n        verticalButton.textContent = isVertical ? \"Vertical\" : \"Horizontal\";\n    })\n\n    // humanSquares.forEach(square => {\n    //     square.addEventListener(\"mouseover\", () => {\n    //         showShadowsOfShip(square, humanSquares, isVertical);\n    //     });\n    //     square.addEventListener(\"click\", () => {\n    //         settleShipsOnBoard(humanBoard, isVertical, square, humanSquares);   \n    //     })\n    // });\n\n    humanDivContainer.addEventListener(\"mouseleave\", () => {\n        humanSquares.forEach(square => {\n            if (square.classList.contains(\"mouseover-ship\")) {\n                square.classList.remove(\"mouseover-ship\");\n            }\n        });\n    });\n\n\n\n    // Define event handler functions\n    function handleMouseover(square) {\n        showShadowsOfShip(square, humanSquares, isVertical);\n    }\n    \n    function handleClick(square) {\n        settleShipsOnBoard(humanBoard, isVertical, square, humanSquares);\n    }\n    \n    // Adding event listener to the container\n    humanDivContainer.addEventListener(\"mouseover\", function(event) {\n        const target = event.target;\n        if (target.classList.contains(\"human-square\")) {\n            handleMouseover(target);\n        }\n    });\n    \n    humanDivContainer.addEventListener(\"click\", function(event) {\n        const target = event.target;\n        if (target.classList.contains(\"human-square\")) {\n            handleClick(target);\n        }\n    });\n\n\n    // DOESN'T WORK!!!\n    const startAgainButton = document.querySelector(\".start-again-button\")\n    startAgainButton.addEventListener(\"click\", () => {\n        while(humanDivContainer.firstChild){\n            humanDivContainer.removeChild(humanDivContainer.firstChild);\n            computerDivContainer.removeChild(computerDivContainer.firstChild);\n        }\n        modal.classList.remove(\"visible\");\n        backdrop.classList.remove(\"visible\"); \n        game();\n    })\n\n}\n\n\nfunction renderBoards(gameBoard, divContainer) {\n\n    if(gameBoard.name === 'computer') {\n        gameBoard.placeComputerShips();\n    }\n    for(let i = 0; i < 10; i++){\n        for(let j = 0; j < 10; j++){\n            const div = document.createElement(\"div\");\n            divContainer.appendChild(div);\n            if(gameBoard.name === \"human\"){\n             div.classList.add(\"human-square\");\n            } else {\n                if(gameBoard.board[i][j] !== null) div.classList.add(\"computer-ship\");\n                div.classList.add(\"computer-square\");\n            };\n            div.row = i;\n            div.column = j;\n        }\n    }\n}\n\nfunction showShadowsOfShip(square, squares, isVertical) {\n    if (isVertical && lengthOfShip >= 2 && lengthOfShip <= 5) {\n        square.classList.toggle(\"mouseover-ship\");\n        squares.forEach(otherSquare => {\n            const partOfShip = otherSquare.row >= square.row && otherSquare.row < square.row + lengthOfShip && otherSquare.column === square.column ;\n            otherSquare.classList.toggle(\"mouseover-ship\", partOfShip);\n        });\n    } else if(lengthOfShip >= 2 && lengthOfShip <= 5) {\n        square.classList.toggle(\"mouseover-ship\");\n        squares.forEach(otherSquare => {\n            const partOfShip = otherSquare.column >= square.column && otherSquare.column < square.column + lengthOfShip && otherSquare.row === square.row ;\n            otherSquare.classList.toggle(\"mouseover-ship\", partOfShip);\n        });\n    }\n}\n\nfunction settleShipsOnBoard(board, isVertical, square, squares) {\n    if(lengthOfShip <= 5 && lengthOfShip >= 2){\n        const rowStart = square.row;\n        const columnStart = square.column;\n        if(board.isValidPlacement(lengthOfShip, rowStart, columnStart, isVertical)){\n            board.placeShip(lengthOfShip, rowStart, columnStart, isVertical);\n            squares.forEach(square => {\n                if(square.classList.contains(\"mouseover-ship\")) square.classList.toggle(\"ship\")\n            });\n            lengthOfShip--;\n        }\n    }\n}\n\n\n\ngame();\n\n//# sourceURL=webpack://battleship/./resources/index.js?");

/***/ }),

/***/ "./resources/player.js":
/*!*****************************!*\
  !*** ./resources/player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./resources/gameboard.js\");\n\n\nfunction Player(name) {\n    const player = {\n        name: name,\n    };\n\n    function computerAttack(gameboard, squares) {\n        const randomRow = Math.floor(Math.random() * 9);\n        const randomColumn = Math.floor(Math.random() * 9);\n        if(gameboard.hasBeenAttacked(randomRow, randomColumn)) computerAttack(gameboard, squares);\n        gameboard.receiveAttack(randomRow, randomColumn);\n        squares.forEach(square => {\n            const row = square.row;\n            const column = square.column;\n            if(randomRow == row && randomColumn == column) {\n                if(square.classList.contains(\"ship\")) {\n                    square.classList.add(\"ship-attacked\");\n                    square.innerHTML = \"&#183\";\n                }else {\n                    square.classList.add(\"null-attacked\");\n                }\n            }\n        })\n    }\n\n    function humanAttack(gameboard, row, column) {\n        if(gameboard.hasBeenAttacked(row, column)) return false;\n        gameboard.receiveAttack(row, column);\n    }\n\n    return {\n        computerAttack,\n        humanAttack\n    }\n}\n\n//# sourceURL=webpack://battleship/./resources/player.js?");

/***/ }),

/***/ "./resources/ship.js":
/*!***************************!*\
  !*** ./resources/ship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nfunction Ship(length) {\n    let hits = 0;\n    let isShipSunk = false;\n\n    function hit() {\n        hits++;\n        if (hits >= length) {\n            isShipSunk = true;\n        }\n        return hits;\n    }\n\n    function isSunk() {\n        return isShipSunk;\n    }\n\n    return {\n        hit: hit,\n        isSunk: isSunk,\n        length: length,\n    };\n}\n\n\n//# sourceURL=webpack://battleship/./resources/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/index.js");
/******/ 	
/******/ })()
;