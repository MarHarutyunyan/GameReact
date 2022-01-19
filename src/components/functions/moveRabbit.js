import { setBoard } from "./setBoard";
import { FREE_CELL, EMPTY, HOUSE_CELL } from "../Constants"
import { defaultState } from "../../store/characterReducer"

export const freeRabbitCoord = ([{ x, y }]) => {
    setBoard([x, y], FREE_CELL, EMPTY)
}
export const newRabbitCoord = (direction, rabbitPos, boardSize) => {
    const [{ x, y }] = rabbitPos;
    let newX = x, newY = y;
    if (direction === 'ArrowUp') {
        newX = (x - 1) < 0 ? (boardSize - 1) : x - 1;
    }
    else if (direction === 'ArrowDown') {
        newX = (x + 1) === boardSize ? 0 : x + 1;
    }
    else if (direction === 'ArrowLeft') {
        newY = (y - 1) < 0 ? (boardSize - 1) : y - 1;
    }
    else if (direction === 'ArrowRight') {
        newY = (y + 1) === boardSize ? 0 : y + 1;
    }
    return [newX, newY, x, y];
}

export const isCellFree = ([newX, newY, x, y], board, updateCharacterState) => {
    [x, y] = (board[newX][newY] === FREE_CELL) ? [newX, newY] : [x, y];
    updateCharacterState(defaultState.rabbit, x, y);
}

export const isInHouse = ([newX, newY], board, gameOver) => {
    if (board[newX][newY] === HOUSE_CELL) {
        defaultState.wolvesWon = false;
        gameOver();
    }
}
//npo nkar korel 
//arrow array