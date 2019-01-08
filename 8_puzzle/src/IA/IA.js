const R = require('ramda');
const helpers = require('./helpers.js');

const tablero = [
    [8, 1, 2],
    [3, 4, 5],
    [6, 0, 7]
];
const posFinal = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Peso de cada ficha
function m(number, pos) {
    const indexToFind = R.compose(
        helpers.findBi,
        R.indexOf(number, R.__),
        R.flatten
    );
    const find = indexToFind(posFinal);
    return Math.abs(find.x - pos.x) + Math.abs(find.y - pos.y);
}

// Funcion que nos ayudará a calcular el peso de cada tablero usando el peso de cada ficha m(1)+m(2)+....m(8)
function heuristicTomato(tablero) {
    let h = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            h += (tablero[y][x] != 0) ? m(tablero[y][x], {
                x,
                y
            }) : 0;
        }
    }
    return h;
}

heuristicTomato(tablero)


// Inicio motor IA
let tableroTemp = [];
let listaPeso = [];

// Variables de uso para obtener el indice y la colisión.
const indexVacio = R.flatten(tablero).indexOf(0); 
const indexBiVacio = helpers.findBi(indexVacio);
const tableroFlat = R.flatten(tablero);
const collision = helpers.checkCollitionIA(indexVacio, tableroFlat);

// Generamos los posibles movimientos (hay que pensar como hacer para movimientos hijos)
if(!collision.up) {
    tableroTemp = R.clone(tablero);
    tableroTemp[indexBiVacio.y][indexBiVacio.x] = tableroTemp[indexBiVacio.y-1][indexBiVacio.x];
    tableroTemp[indexBiVacio.y-1][indexBiVacio.x] = 0;
    listaPeso.push({value: heuristicTomato(tableroTemp), mov: 'up'});
}
if(!collision.down) {
    tableroTemp = R.clone(tablero);
    tableroTemp[indexBiVacio.y][indexBiVacio.x] = tableroTemp[indexBiVacio.y+1][indexBiVacio.x];
    tableroTemp[indexBiVacio.y+1][indexBiVacio.x] = 0;
    listaPeso.push({ value: heuristicTomato(tableroTemp), mov: 'down'});
}
if(!collision.left) {
    tableroTemp = R.clone(tablero);
    tableroTemp[indexBiVacio.y][indexBiVacio.x] = tableroTemp[indexBiVacio.y][indexBiVacio.x-1];
    tableroTemp[indexBiVacio.y][indexBiVacio.x-1] = 0;
    listaPeso.push({value: heuristicTomato(tableroTemp), mov: 'left'});
}
if(!collision.right) {
    tableroTemp = R.clone(tablero);
    tableroTemp[indexBiVacio.y][indexBiVacio.x] = tableroTemp[indexBiVacio.y-1][indexBiVacio.x+1];
    tableroTemp[indexBiVacio.y][indexBiVacio.x+1] = 0;
    listaPeso.push({value: heuristicTomato(tableroTemp), mov: 'right'});
}

// 
console.log(listaPeso);