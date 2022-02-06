export const setCharacterCoords = (board, [x, y], character) => {
    board[x][y] = character.id;
}