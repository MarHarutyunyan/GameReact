export const gameover = (gameOverData) => {
    gameOverData.gameOver = !gameOverData.gameOver;
    gameOverData.winner = gameOverData.wolvesWon ? "You Lose!" : "You Win!";
};