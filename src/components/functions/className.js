import {
    BUSH_CELL,
    BARRIER_CELL,
    HOUSE_CELL,
    WOLF_CELL,
    RABBIT_CELL,
    FREE_CELL,

} from "../Constants"
const characterImg =
{
    [FREE_CELL]: '',
    [RABBIT_CELL]: 'rabbit',
    [HOUSE_CELL]: 'house',
    [WOLF_CELL]: 'wolf',
    [BARRIER_CELL]: 'barrier',
    [BUSH_CELL]: 'bush'
};

export const classNameById = (id) => {
    return characterImg[id];
}