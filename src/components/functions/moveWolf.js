import { FREE_CELL, EMPTY, WOLF_CELL, RABBIT_CELL } from "../Constants"
import { setBoard } from "./setBoard"
import { gameover } from "./gameOver"

export const isOnRabbit = ([x, y], board, gameOverData) => {
  if (board[x][y] === RABBIT_CELL) {
    gameOverData.wolvesWon = true
    gameover(gameOverData)
  }
}

export const moveOnBoard = ([newX, newY], board) =>
  setBoard([newX, newY], WOLF_CELL, board)

export const freeWolfCoord = ([x, y], board) =>
  setBoard([x, y], FREE_CELL, board)

export const getAllPossibleDirections = ([x, y]) => [
  [x - 1, y],
  [x, y - 1],
  [x + 1, y],
  [x, y + 1],
]

export const getLegalMoves = (moves, board, wolfForbidddenMoves) => {
  return moves.filter(
    ([x, y]) =>
      x >= 0 &&
      x < board.length &&
      y >= 0 &&
      y < board.length &&
      wolfForbidddenMoves.includes(board[x][y]) === false
  )
}

export const calcDistance =
  ([x0, y0]) =>
  ([x1, y1]) =>
    Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))

// export const selectMinimumDistanceMove = (moves, target) => {
//     let minimumMoveIndex = 0
//     let distance = null
//     for (let i=0; i<moves.length; i++) {
//         const currentMoveDistance = calcDistance(move, target)
//         if (distance === null || distance < currentMoveDistance) {
//           minimumMoveIndex = i
//           distance = currentMoveDistance
//         }
//     }

//   return moves[minimumMoveIndex]
// }

// export const selectMinimumDistanceMove = (moves, target) => {
//     let minimumMoveIndex = 0
//     const minDistance = moves.reduce((distance, move, index) => {
//         const currentMoveDistance = calcDistance(move, target)
//         if (distance === null || distance < currentMoveDistance) {
//             minimumMoveIndex = index
//             return currentMoveDistance
//         }
//         return distance
//     }, null)

//     return moves[minimumMoveIndex]
// }

// export const selectMinimumDistanceMove = (moves, target) => {
//   const [_, minMoveIndex] = moves.reduce(
//     ([distance, minMoveIndex], move, index) => {
//       const currentMoveDistance = calcDistance(move, target)
//       if (distance === null || distance < currentMoveDistance) {
//         return [currentMoveDistance, index]
//       }
//       return [distance, minMoveIndex]
//     },
//     [null, null]
//   )

//   return moves[minMoveIndex]
// }

export const selectMinimumDistanceMove = (moves, target) => {
  const distances = moves.map(calcDistance(target))
  const minDistance = Math.min(...distances)
  const minMoveIndex = distances.findIndex((d) => d === minDistance)
  return moves[minMoveIndex]
}

export const getMinCoord = (distances, mindistance, moves) => {
  return moves[distances.indexOf(mindistance)]
}
