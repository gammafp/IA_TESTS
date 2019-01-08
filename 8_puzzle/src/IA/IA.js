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
for (let i = 0; i < 4; i++) {

}