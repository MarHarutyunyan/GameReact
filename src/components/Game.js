import React from 'react'


export default function Game({ board, uiData }) {
    return (
        <div id='grid-container' className={uiData.gridContainer}>
            {
                board.map((_, i) => (
                    board.map((_, j) => (
                        <div key={i+j} className={board[i][j]}></div>
                    ))
                ))
            }
        </div>
    )
}
