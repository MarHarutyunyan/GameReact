export const getCharacterCoords = (board, boardSize, character) => {
  const pos = []
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === character.id) {
        pos.push([i, j])
      }
    }
  }
  return pos

  //   return boardSize.reduce((acc, row, i) => {
  //     row.reduce((_, cell, j) => {
  //       if (cell === character.id) {
  //         acc.push(i, j)
  //       }
  //     })

  //     return acc
  //   }, [])
}
