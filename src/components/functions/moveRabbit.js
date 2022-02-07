import { setBoard } from "./setBoard"
import { FREE_CELL, HOUSE_CELL, WOLF_CELL } from "../Constants"
import { gameover } from "./gameOver"
import { setCharacterCoords } from "./setCharacterCoords"

export const clearCoord = ([x, y], board) => {
  setBoard([x, y], FREE_CELL, board)
}
export const changePosition = (direction, rabbitPos, boardSize) => {
  const [x, y] = rabbitPos
  let newX = x,
    newY = y
  if (direction === "ArrowUp") {
    newX = x - 1 < 0 ? boardSize - 1 : x - 1
  } else if (direction === "ArrowDown") {
    newX = x + 1 === boardSize ? 0 : x + 1
  } else if (direction === "ArrowLeft") {
    newY = y - 1 < 0 ? boardSize - 1 : y - 1
  } else if (direction === "ArrowRight") {
    newY = y + 1 === boardSize ? 0 : y + 1
  }
  return [newX, newY]
}

export const isCellFree = ([x, y], board) => board[x][y] === FREE_CELL

export const checkForGameOver = ([x, y], board, character, gameOverData) => {
  if (board[x][y] === HOUSE_CELL) {
    gameOverData.wolvesWon = false
    gameover(gameOverData)
  } else if (board[x][y] === WOLF_CELL) {
    gameOverData.wolvesWon = true
    gameover(gameOverData)
  } else {
    setCharacterCoords(board, [x, y], character)
  }
}

export const ifPositionIsLegal = ([x, y], character, board) => {
  return character.allowedMoves.includes(board[x][y])
}
