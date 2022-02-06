import { FREE_CELL, EMPTY, WOLF_CELL, RABBIT_CELL } from "../Constants"
import { setBoard } from "./setBoard";
import { gameover } from "./gameOver";

export const isOnRabbit = ([x, y], board, gameOverData) => {
    if (board[x][y] === RABBIT_CELL) {
        gameOverData.wolvesWon = true;
        gameover(gameOverData);
    }
}

export const moveOnBoard = ([newX, newY], board) => {
    setBoard([newX, newY], WOLF_CELL, board);
}
export const freeWolfCoord = ([x, y], board) => {
    setBoard([x, y], FREE_CELL, board)
}

export const getAllPossibleDirections = ([x, y]) => {
    return [[x - 1, y], [x, y - 1], [x + 1, y], [x, y + 1]]
}

export const getLegalMoves = (moves, board, wolfForbidddenMoves) => {
    return moves.filter(
        ([x, y]) => (
            x >= 0 && x < board.length
            && y >= 0 && y < board.length
            && !wolfForbidddenMoves.includes(board[x][y])
        )
    );
}

export const calcMoveDistances = (moves, [z, k]) => {
    const distances = [];
    moves.forEach(([x, y]) => {
        distances.push(Math.sqrt(Math.pow((x - z), 2) + Math.pow((y - k), 2)))
    });
    return distances;
}

export const selectMinimumDistanceMove = (distances) => {
    return Math.min.apply(Math, distances);
}

export const getMinCoord = (distances, mindistance, moves) => {
    return moves[distances.indexOf(mindistance)]
}
