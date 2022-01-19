import {
    RABBIT_CELL,
    HOUSE_CELL,
    WOLF_CELL,
    DECOR_CELL
} from "../components/Constants"

import { setBoard } from "../components/functions/setBoard"
import { createBoard } from "../components/functions/createBoard"
import { positionCharacter } from "../components/functions/setPosition"
import { freeRabbitCoord, isCellFree, isInHouse, newRabbitCoord } from "../components/functions/moveRabbit"
import {
    getAllPossibleLegalDirections,
    selectMinimumDirectionMove,
    newWolfCoord,
    isOnRabbit,
    moveOnBoard,
    freeWolfCoord
} from "../components/functions/moveWolf"

export const defaultState = {
    boardSize: 0,
    boardId: [],
    boardHtml: [],
    gameOver: false,
    winner: '',
    wolvesWon: false,
    rabbit: {
        name: "rabbit",
        id: RABBIT_CELL,
        count: 1,
        position: [],
    },
    house: {
        name: "house",
        id: HOUSE_CELL,
        count: 1,
        position: []
    },
    wolf: {
        name: "wolf",
        id: WOLF_CELL,
        count: '',
        position: [],
        forbiddenMoves: [DECOR_CELL, WOLF_CELL, HOUSE_CELL],
    },
    bush: {
        name: "bush",
        id: DECOR_CELL,
        count: '',
        position: []
    },
    fence: {
        name: "fence",
        id: DECOR_CELL,
        count: '',
        position: []
    }
}

let boardSize;

export const characterReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CREATING_BOARD': {
            boardSize = action.id;
            const board = createBoard(boardSize, state.boardId, state.boardHtml);
            return {
                ...state,
                boardSize: action.id,
                boardId: board.id,
                boardHtml: board.ui,
                wolf: {
                    ...state.wolf,
                    count: Math.round(boardSize / 2),
                },
                bush: {
                    ...state.bush,
                    count: Math.round(boardSize / 2),
                },
                fence: {
                    ...state.fence,
                    count: Math.round(boardSize / 2) - 1,
                }
            }

        }
        case 'SETTING_POSITION_CHARACTERS': {

            const updateState = (x, y, character, board) => {
                character.position.push({ x: x, y: y });
                board[x][y] = character.id;
                state.boardHtml[x][y] = character.name
            }
            positionCharacter(state.boardId, state.rabbit, 1, state.boardSize, updateState);
            positionCharacter(state.boardId, state.house, 1, state.boardSize, updateState);
            positionCharacter(state.boardId, state.wolf, state.wolf.count, state.boardSize, updateState);
            positionCharacter(state.boardId, state.bush, state.bush.count, state.boardSize, updateState);
            positionCharacter(state.boardId, state.fence, state.fence.count, state.boardSize, updateState);
            return {
                ...state,
            }
        }
        case 'MOVE_CHARACTERS': {
            const direction = action.direction.code;

            const gameOver = () => {
                state.gameOver = !state.gameOver;
                state.winner = (defaultState.wolvesWon) ? "You Lose!" : "You Win!";
            };
            const moveWolf = (wolfCoord, indexofWolf, [newX, newY]) => {
                freeWolfCoord(wolfCoord);
                isOnRabbit(newWolfCoord(indexofWolf, [newX, newY]), gameOver);
                moveOnBoard([newX, newY]);
            }
            const attackRabbit = (wolfCoord, rabbitCoord, indexofWolf) =>
            (moveWolf(wolfCoord, indexofWolf,
                selectMinimumDirectionMove
                    (getAllPossibleLegalDirections(wolfCoord, rabbitCoord, state.boardId, state.wolf.forbiddenMoves), rabbitCoord),
                state.boardId, state.boardHtml)
            );
            const updateCharacterState = (character, x, y) => {
                character.position = [{ x, y }];
                setBoard([x, y], RABBIT_CELL, character.name);
            }
            const changeRabbitPosiotion = () => {
                freeRabbitCoord(state.rabbit.position);
                const newRabbitCoords = newRabbitCoord(direction, state.rabbit.position, boardSize);
                isCellFree(newRabbitCoords, state.boardId, updateCharacterState);
                isInHouse(newRabbitCoords, state.boardId, gameOver);
            }

            changeRabbitPosiotion(direction, state.rabbit.position, boardSize);
            if (!state.gameOver) {
                Array(state.wolf.count).fill().forEach((_, i) => {
                    const wolfCoord = Object.values(state.wolf.position[i]);
                    const rabbitCoord = Object.values(state.rabbit.position[0]);
                    attackRabbit(wolfCoord, rabbitCoord, i);

                });
            }
        }
        default: return state;
    }
}

