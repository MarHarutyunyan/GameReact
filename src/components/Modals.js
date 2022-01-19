import React from 'react'

export default function Modals({ uiData, startGame, restart, demo }) {
    return (
        <div>
            <div className={[uiData.modalStart, uiData.modalDefaultStyle].join(" ")}>
                <div className="modal-content">
                    <button className="modalBtn" onClick={() => { startGame(5) }}>5 x 5</button>
                    <button className="modalBtn" onClick={() => { startGame(7) }}>7 x 7</button>
                    <button className="modalBtn" onClick={() => { startGame(10) }}>10 x 10</button>
                </div>
            </div>
            <div className={[uiData.modalEnd, uiData.modalDefaultStyle].join(" ")}>
                <div className="modal-content2">
                    <p>GAME OVER!</p>
                    <p id="demo">{demo}</p>
                    <button className="modalBtn" onClick={restart}>restart</button>
                </div>
            </div>
        </div>
    )
}

