import helpers from "./helpers.js";

const stateEnd = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
];

/**
 * Función heuristica para encontrar el valor mas corto del tablero actual
 * @param {Array} actualBoard - 
 * @param {Array} boardEnd 
 * @return {Number} 
 */
const heuristic = (actualBoard, boardEnd = stateEnd) => {
    return actualBoard.reduce((prevY, currentY, indexY) =>  prevY + currentY.reduce((prevX, currentX, indexX) => {
            const indexBiBoardEnd = helpers.findIndexBi(currentX, boardEnd)
            // Encuentra la distancia entre dos piezas
            return prevX + ((currentX === 0) ? 0 :  Math.abs(indexX - indexBiBoardEnd.x) + Math.abs(indexY - indexBiBoardEnd.y));
        }, 0)
    , 0);
}

export default heuristic;