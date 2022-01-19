import { FREE_CELL, EMPTY } from "../Constants"
import { setBoard } from "./setBoard";

export const createBoard = (boardSize, boardId, boardHtml) => {
    Array(boardSize).fill().forEach((_, i) => {
        boardId[i] = new Array(boardSize);
        boardHtml[i] = new Array(boardSize);
        Array(boardSize).fill().forEach((_, j) => {
            setBoard([i, j], FREE_CELL, EMPTY);
        });
    });
    return { ui: boardHtml, id: boardId };
}