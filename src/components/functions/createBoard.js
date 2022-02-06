import { FREE_CELL } from "../Constants"
import { setBoard } from "./setBoard";

export const createBoard = (boardSize, board) => {
    Array(boardSize).fill().forEach((_, i) => {
        board[i] = new Array(boardSize);
        Array(boardSize).fill().forEach((_, j) => {
            setBoard([i, j], FREE_CELL, board);
        });
    });
    return board;
}