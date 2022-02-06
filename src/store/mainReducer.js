import {
    BUSH_CELL,
    BARRIER_CELL,
    HOUSE_CELL,
    WOLF_CELL,
    RABBIT_CELL,
    FREE_CELL,

} from "../components/Constants"
import { createBoard } from '../components/functions/createBoard'
import { positionCharacter } from "../components/functions/setPosition";
import { changeRabbitPosition } from "../components/functions/changeCharacterPosition"
import { attackRabbit } from "../components/functions/changeCharacterPosition";

const defaultState = {
    characters: {
        [RABBIT_CELL]: {
            name: "rabbit",
            id: RABBIT_CELL,
            allowedMoves: [FREE_CELL, WOLF_CELL, HOUSE_CELL],
            count: 1
        },
        [WOLF_CELL]: {
            name: "wolf",
            id: WOLF_CELL,
            allowedMoves: [FREE_CELL, RABBIT_CELL],
            forbiddenMoves: [BARRIER_CELL, BUSH_CELL, WOLF_CELL, HOUSE_CELL],
            count: 0,
        },
        [BUSH_CELL]: { name: "bush", id: BUSH_CELL, count: 0 },
        [BARRIER_CELL]: { name: "barrier", id: BARRIER_CELL, count: 0 },
        [HOUSE_CELL]: { name: "house", id: HOUSE_CELL, count: 1 },
    },
    boardSize: 0,
    boardId: [],
    gameOverData: {
        gameOver: false,
        winner: '',
        wolvesWon: false,
    }
}
let boardSize;
export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CREATING_BOARD': {
            boardSize = action.id;
            const board = createBoard(boardSize, state.boardId);
            return {
                ...state,
                boardSize: action.id,
                boardId: board,
                ...state.characters[WOLF_CELL].count = Math.round(boardSize / 2),
                ...state.characters[BUSH_CELL].count = Math.round(boardSize / 2),
                ...state.characters[BARRIER_CELL].count = Math.round(boardSize / 2) - 1,
            }
        }
        case 'SETTING_POSITION_CHARACTERS': {
            positionCharacter(state.boardId, state.characters[RABBIT_CELL], state.boardSize);
            positionCharacter(state.boardId, state.characters[HOUSE_CELL], state.boardSize);
            positionCharacter(state.boardId, state.characters[WOLF_CELL], state.boardSize);
            positionCharacter(state.boardId, state.characters[BUSH_CELL], state.boardSize);
            positionCharacter(state.boardId, state.characters[BARRIER_CELL], state.boardSize);
            return {
                ...state,
            }
        }
        case 'MOVE_CHARACTERS': {
            const direction = action.direction.code;
            changeRabbitPosition(direction, state.boardId, state.boardSize, state.characters[RABBIT_CELL], state.gameOverData);
            if (!state.gameOverData.gameOver) {
                attackRabbit(state.boardId, state.characters[RABBIT_CELL], state.characters[WOLF_CELL], state.boardSize, state.gameOverData);
            }
            return {
                ...state
            };
        }
        default: return state;
    }
}
