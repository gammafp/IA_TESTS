// Convierte array unidimensional a array bi-dimensional (refactorizar si se gusta)
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

// Encontramos la posición bi-dimensional en base a un número en la matriz 3x3
const findBi = (index) => {
    return {
        x: index % 3,
        y: Math.floor(index / 3)
    }
}

//Intercambio de 2 elementos en un arreglo
const swap = (indexA, indexB, array) => {
    [array[indexA], array[indexB]] = [array[indexB], array[indexA]]
    return array;
}

// Obtenemos el indice de la pieza.
const getIndex = (array, name) => array.findIndex(x => x.name === name);

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

export default {
    oneToBi,
    getIndex,
    findBi,
    checkCollition,
    swap
};