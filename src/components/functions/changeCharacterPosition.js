import { getCharacterCoords } from "./getCharacterCoords"
import { setCharacterCoords } from "./setCharacterCoords"
import {
  clearCoord,
  changePosition,
  checkForGameOver,
  ifPositionIsLegal,
} from "./moveRabbit"
import {
  freeWolfCoord,
  getAllPossibleDirections,
  getLegalMoves,
  selectMinimumDistanceMove,
  getMinCoord,
  isOnRabbit,
  moveOnBoard,
} from "./moveWolf"

export const changeRabbitPosition = (
  direction,
  board,
  boardSize,
  character,
  gameOverData
) => {
  const rabbitOldCoord = getCharacterCoords(board, boardSize, character)[0]
  clearCoord(rabbitOldCoord, board)
  const newPosition = changePosition(direction, rabbitOldCoord, boardSize)
  ifPositionIsLegal(newPosition, character, board)
    ? checkForGameOver(newPosition, board, character, gameOverData)
    : setCharacterCoords(board, rabbitOldCoord, character)
}

export const attackRabbit = (board, rabbit, wolf, boardSize, gameOverData) => {
  const rabbitCoord = getCharacterCoords(board, boardSize, rabbit)[0]
  const wolvesCoord = getCharacterCoords(board, boardSize, wolf)
  wolvesCoord.forEach((wolfCoord) => {
    const possibleMoves = getAllPossibleDirections(wolfCoord)
    const legalMoves = getLegalMoves(possibleMoves, board, wolf.forbiddenMoves)

    let minCoord = wolfCoord

    if (legalMoves.length) {
      minCoord = selectMinimumDistanceMove(distances, rabbitCoord)
    }

    moveWolf(wolfCoord, minCoord, board, gameOverData)
  })
}
const moveWolf = (wolfCoord, coord, board, gameOverData) => {
  freeWolfCoord(wolfCoord, board)
  isOnRabbit(coord, board, gameOverData)
  moveOnBoard(coord, board)
}
