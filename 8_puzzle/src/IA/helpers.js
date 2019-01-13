/**
 * Encontramos la posición bi-dimensional en base a un número en la matriz 3x3
 * @param {Number} index 
 * @return \{x: number, y: number}
 */
const findBi = (index) => ({
    x: index % 3,
    y: Math.floor(index / 3)
});

const findIndexBi = (number, board) => R.compose(
    findBi,
    R.indexOf(number, R.__),
    R.flatten
)(board);

/**
 * Intercambio de 2 elementos en un arreglo
 * @param {Number} indexA
 * @param {Number} indexB 
 * @param {Array} array 
 * @return {Array} Array
 */
const swap = (indexA, indexB, array) => ([array[indexA], array[indexB]] = [array[indexB], array[indexA]], array)

const checkCollitionIA = (array) => {
    const index = R.indexOf(0, R.flatten(array));
    const indexBi = findBi(index);

    const colision = {
        up: (array[indexBi.y - 1] === undefined) ? true : false,
        down: (array[indexBi.y + 1] === undefined) ? true : false,
        left: (array[indexBi.y][indexBi.x - 1] === undefined) ? true : false,
        right: (array[indexBi.y][indexBi.x + 1] === undefined) ? true : false,
    };
    return colision;
}

let idUnique = 0;
const uniqueID = () => ++idUnique;

const bestMov = (positions) => {
    const seePos = positions.filter(x => !x.see);
    const min = seePos.reduce((min, b) => Math.min(min, b.value), positions[0].value);

    const bestPosition = seePos.filter((x) => x.value === min);
    const out = (bestPosition[0] === undefined) ? false : bestPosition[0];
    if(out) {
        out.see = true;
    }
    return out;
}

const flattenJoin = R.compose(
    R.join('', R.__),
    R.flatten
);

export default {
    flattenJoin,
    bestMov,
    uniqueID,
    checkCollitionIA,
    swap,
    findIndexBi
};