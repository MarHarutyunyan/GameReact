const characterImg =
{
    [0]: '',
    [1]: 'rabbit',
    [2]: 'house',
    [3]: 'wolf',
    [4]: 'barrier',
    [5]: 'bush'
};

export const classNameById = (id) => {
    return characterImg[id];
}