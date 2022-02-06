import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import '../Main.css';
import Game from './Game';
import Modals from './Modals';
import { checkKeyCode } from './functions/checkKeyCode';

const Main = () => {

    const dispatch = useDispatch();
    const uiData = useSelector(state => state.style);
    const boardData = useSelector(state => state.main);
    const [board, setBoard] = useState(boardData.boardId);
    const [demo, setDemo] = useState("");

    const keyHandler = (event) => {
        if (checkKeyCode(event)) {
            if (uiData.modalStart === 'invisible' && uiData.modalEnd === 'invisible') {
                dispatch({ type: 'MOVE_CHARACTERS', direction: event });
                if (boardData.gameOverData.gameOver) {
                    dispatch({ type: 'MODAL_GAME_OVER' });
                    setDemo(boardData.gameOverData.winner);
                }
            }
        }
        setBoard([...boardData.boardId]);
    }

    useEffect(() => {
        window.addEventListener("keydown", keyHandler);
        return () => window.removeEventListener("keydown", keyHandler);
    }, [boardData, uiData]);

    const startGame = (id) => {
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
            <Modals restart={restart} startGame={startGame} uiData={uiData} demo={demo}></Modals>
            <Game uiData={uiData} board={board}></Game>
        </div>
    );
}
export default Main;