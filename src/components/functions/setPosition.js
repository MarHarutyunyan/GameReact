import { FREE_CELL } from "../Constants"

const getRandomCoords = (boardSize) => {
    const randomCoord = Math.floor(Math.random() * (boardSize - 1));
    return randomCoord;
};

const getRandomFreeCoords = (board, boardSize) => {
    const [x, y] = [getRandomCoords(boardSize), getRandomCoords(boardSize)];
    if (board[x][y] === FREE_CELL) {
        return [x, y];
    }
    return getRandomFreeCoords(board,boardSize);
};

const positionSingleCharacter = (board, character, boardSize, updateState) => {
    const [x, y] = getRandomFreeCoords(board, boardSize)
    return updateState(x, y, character, board);
};

export const positionCharacter = (board, character, count, boardSize, updateState) => {
    Array(count).fill().forEach(() => positionSingleCharacter(board, character, boardSize, updateState));
};