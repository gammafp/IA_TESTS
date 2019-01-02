// Convierte array unidimensional a array bi-dimensional (refactorizar si se gusta)
const oneToBi = (array) => {
    
    let y = 0;
    let aut = array.reduce((prev, current, i) => {
        y = (i%3 === 0) ? y + 1: y;
        prev[y-1] = (prev[y-1] === undefined) ? [] : prev[y-1];

        prev[y-1].push(current);
        return prev;
    }, [[]]);

    return aut;
};

// Encontramos la posición bi-dimensional en base a un número en la matriz 3x3 ()
const findBi = (num) => {
    let xValor = Math.floor(num/3);
    let yValor = num - xValor*3;

    return {x: xValor, y: yValor}
}

// Obtenemos el indice de la pieza.
const getIndex = (array, name) => array.findIndex(x => x.name === name);

export default {oneToBi, getIndex, findBi};