import { defaultState } from "../../store/characterReducer";
export const setBoard = ([x, y], CELL, name) => {
    defaultState.boardId[x][y] = CELL;
    defaultState.boardHtml[x][y] = name;
}