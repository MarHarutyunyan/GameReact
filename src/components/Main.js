import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Game from './Game';
import Modals from './Modals';
import { checkKeyCode } from './functions/checkKey';

const Main = () => {

    const dispatch = useDispatch();
    const uiData = useSelector(state => state.ui);
    const boardData = useSelector(state => state.character);
    const [board, setBoard] = useState(boardData.boardHtml);
    const [demo, setDemo] = useState("");

    const keyHandler = (event) => {
        if (checkKeyCode(event)) {
            if (uiData.modalStart === 'invisible' && uiData.modalEnd === 'invisible') {
                dispatch({ type: 'MOVE_CHARACTERS', direction: event });
                if (boardData.gameOver) {
                    dispatch({ type: 'MODAL_GAME_OVER' });
                    setDemo(boardData.winner);
                }
            }
        }
        setBoard([...boardData.boardHtml]);
    }

    useEffect(() => {
        window.addEventListener("keydown", keyHandler);
        return () => window.removeEventListener("keydown", keyHandler);
    }, [boardData, uiData]);

    function startGame(id) {
        dispatch({ type: 'BOARD-SIZE', id: id });
        dispatch({ type: 'MODAL_BOARD_SIZE' });
        dispatch({ type: 'GRID_STYLE' });
        dispatch({ type: 'CREATING_BOARD', id: id });
        dispatch({ type: 'SETTING_POSITION_CHARACTERS' });
    };
    function restart() {
        window.location.reload();
    };

    return (
        <div>
            <Modals restart={restart} startGame={startGame} demo={demo} uiData={uiData}></Modals>
            <Game uiData={uiData} board={board}></Game>
        </div>
    );
}
export default Main;


