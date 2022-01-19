import { FREE_CELL, EMPTY, WOLF_CELL, RABBIT_CELL } from "../Constants"
import { setBoard } from "./setBoard";
import { defaultState } from "../../store/characterReducer";

export const getAllPossibleLegalDirections = (wolfCoord, rabbitCoord, boardId, wolfForbidddenMoves) => {
    const shortestWay = []
    const visited = new Set();
    const queue = [];
    queue.push(wolfCoord)

    while (queue.length) {
        const root = queue.shift()
        visited.add(root.toString())
        if (root.toString() === rabbitCoord.toString()) return shortestWay;

        for (const child of successors(root, boardId, wolfForbidddenMoves)) {
            if (!visited.has(child.toString())) {
                shortestWay[child] = root
                queue.push(child)
            }
        }
    }
    if (!queue.length) {
        if (visited.size === 1) {
            return [wolfCoord, rabbitCoord];
        }
        wolfCoord = successors(wolfCoord, boardId, wolfForbidddenMoves)[0];
        return [wolfCoord, rabbitCoord];
    }
};
const successors = ([x, y], boardId, wolfForbidddenMoves) => {
    return [
        [x - 1, y],
        [x, y - 1],
        [x + 1, y],
        [x, y + 1]].filter(
            ([x, y]) => (
                x >= 0 && x < boardId.length
                && y >= 0 && y < boardId[0].length
                && !wolfForbidddenMoves.includes(boardId[x][y])
            )
        );
};

export const selectMinimumDirectionMove = (shortestWay, rabbitCoord) => {
    const path = [rabbitCoord]
    let parent = shortestWay[rabbitCoord]
    if (parent === undefined) {
        return shortestWay[0];
    }
    while (parent) {
        path.push(parent)
        parent = shortestWay[parent]
    }
    return path.reverse()[1];
};

export const newWolfCoord = (indexofWolf, [newX, newY]) => {
    const wolfPos = Object.assign(defaultState.wolf.position[indexofWolf]);
    [wolfPos.x, wolfPos.y] = [newX, newY];
    return wolfPos
}
export const isOnRabbit = (wolfPos, gameOver) => {
    if (defaultState.boardId[wolfPos.x][wolfPos.y] === RABBIT_CELL) {
        defaultState.wolvesWon = true;
        gameOver();
    }
}

export const moveOnBoard = ([newX, newY]) => {
    setBoard([newX, newY], WOLF_CELL, defaultState.wolf.name);
}
export const freeWolfCoord = ([x, y ]) => {
    setBoard([x, y], FREE_CELL, EMPTY)
}