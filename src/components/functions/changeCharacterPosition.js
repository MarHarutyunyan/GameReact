import { getCharacterCoords } from "./getCharacterCoords";
import { setCharacterCoords } from "./setCharacterCoords";
import {
    clearCoord,
    changePosition,
    checkForGameOver,
    ifPositionIsLegal
} from "./moveRabbit";
import {
    freeWolfCoord,
    getAllPossibleDirections,
    getLegalMoves,
    calcMoveDistances,
    selectMinimumDistanceMove,
    getMinCoord,
    isOnRabbit,
    moveOnBoard
} from "./moveWolf";

export const changeRabbitPosition = (direction, board, boardSize, character, gameOverData) => {
    const rabbitOldCoord = getCharacterCoords(board, boardSize, character)[0];
    clearCoord(rabbitOldCoord, board);
    const newPosition = changePosition(direction, rabbitOldCoord, boardSize);
    ifPositionIsLegal(newPosition, character, board) ?
        checkForGameOver(newPosition, board, character, gameOverData) :
        setCharacterCoords(board, rabbitOldCoord, character);
}

export const attackRabbit = (board, rabbit, wolf, boardSize, gameOverData) => {
    const rabbitCoord = getCharacterCoords(board, boardSize, rabbit)[0];
    const wolfCoord = getCharacterCoords(board, boardSize, wolf);
    wolfCoord.forEach((_, i) => {
        const possibleMoves = getAllPossibleDirections(wolfCoord[i])
        const legalMoves = getLegalMoves(possibleMoves, board, wolf.forbiddenMoves)
        if (legalMoves.length) { 
            const distances = calcMoveDistances(legalMoves, rabbitCoord);
            const minDistance = selectMinimumDistanceMove(distances)
            const minCoord = getMinCoord(distances, minDistance, legalMoves);
            moveWolf(wolfCoord[i], minCoord, board, gameOverData)
        }
        else {
            moveWolf(wolfCoord[i], wolfCoord[i], board, gameOverData)
        }
    });
}
const moveWolf = (wolfCoord, coord, board, gameOverData) => {
    freeWolfCoord(wolfCoord, board);
    isOnRabbit(coord, board, gameOverData);
    moveOnBoard(coord, board);
}
