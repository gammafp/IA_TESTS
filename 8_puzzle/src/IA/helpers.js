/**
 * Convierte array unidimensional a array bi-dimensional (refactorizar si se gusta)
 * @param {Array} array 
 * @return {Array} Array Bi
 */
const oneToBi = (array) => {
    let y = 0;
    let aut = array.reduce((prev, current, i) => {
        y = (i % 3 === 0) ? y + 1 : y;
        prev[y - 1] = (prev[y - 1] === undefined) ? [] : prev[y - 1];

        prev[y - 1].push(current);
        return prev;
    }, [
        []
    ]);

    return aut;
};

/**
 * Encontramos la posición bi-dimensional en base a un número en la matriz 3x3
 * @param {Number} index 
 * @return \{x: number, y: number}
 */
const findBi = (index) => {
    return {
        x: index % 3,
        y: Math.floor(index / 3)
    }
};

/**
 * Intercambio de 2 elementos en un arreglo
 * @param {Number} indexA
 * @param {Number} indexB 
 * @param {Array} array 
 * @return {Array} Array
 */
const swap = (indexA, indexB, array) => {
    [array[indexA], array[indexB]] = [array[indexB], array[indexA]]
    return array;
}

/**
 * Obtenemos el indice de la pieza.
 * @param {Array} array - El array entero
 * @param {string} name - Nombre de la pieza
 * @return Number
 */
const getIndex = (array, name) => array.findIndex(x => x.name === name);

/**
 * Comprueba si las piezas están en colisión con las piezas colindantes.
 * @param {Number} index - Indice de la pieza
 * @param {Array} array - El array entero de las piezas [0, 1, 2, ..., 8]
 * @return {up: Boolean, down: Boolean, left: Boolean, right: Boolean}
 */
const checkCollition = (index, array) => {
    const indexBi = findBi(index);
    const biArray = oneToBi(array);
  
    const colision = {
        up: (biArray[indexBi.y - 1] === undefined || biArray[indexBi.y - 1][indexBi.x].name != 'vacio') ? true : false,
        down: (biArray[indexBi.y + 1] === undefined || biArray[indexBi.y + 1][indexBi.x].name != 'vacio') ? true : false,
        left: (biArray[indexBi.y][indexBi.x - 1] === undefined || biArray[indexBi.y][indexBi.x - 1].name != 'vacio') ? true : false,
        right: (biArray[indexBi.y][indexBi.x + 1] === undefined || biArray[indexBi.y][indexBi.x + 1].name != 'vacio') ? true : false,
    };
    return colision;
}

const checkCollitionIA = (index, array) => {
    const indexBi = findBi(index);
    const biArray = oneToBi(array);
  
    const colision = {
        up: (biArray[indexBi.y - 1] === undefined) ? true : false,
        down: (biArray[indexBi.y + 1] === undefined) ? true : false,
        left: (biArray[indexBi.y][indexBi.x - 1] === undefined) ? true : false,
        right: (biArray[indexBi.y][indexBi.x + 1] === undefined) ? true : false,
    };
    return colision;
}

/**
 * Comprueba si las piezas están en la posición del resultado del puzzle.
 * @param {Array} array - El array entero de las piezas [0, 1, 2, ..., 8]
 * @return {boolean}
 */

const win = (array) => {
    let result = true
    for(let i=0; i<8; i++){
        if( ('pieza_' + (i+1).toString()) !== array[i].name){
            result = false;
        }
    }
    return result
}

module.exports = {
    oneToBi,
    getIndex,
    findBi,
    checkCollition,
    checkCollitionIA,
    swap,
    win
};