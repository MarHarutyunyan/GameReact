const stateUi = {
    modalStart: 'visible',
    modalDefaultStyle: 'modal',
    modalEnd: 'invisible',
    boardSize: 0,
    gridContainer: '',
}

export const styleReducer = (state = stateUi, action) => {
    switch (action.type) {
        case 'MODAL_BOARD_SIZE': {
            return { ...state, modalStart: 'invisible' }
        }
        case 'MODAL_GAME_OVER': {
            return { ...state, modalEnd: 'visible' }
        }
        case 'BOARD-SIZE': {
            return { ...state, boardSize: action.id }
        }
        case 'GRID_STYLE': {
            return { ...state, gridContainer: "boardStyle" + state.boardSize }
        }
        default: return state;
    }

}
