import helpers from './helpers.js';
import heuristic from './heuristic.js';

const generatePos = (boardIn) => {
    const board = R.clone(boardIn);
    const indexZero = helpers.findIndexBi(0, board.board);
    const collision = helpers.checkCollitionIA(board.board);
    const possibleMov = [];

    if (!collision.up && boardIn.mov != 'down') {
        const boardTemp = R.clone(board.board);
        // Donde está el cero será igual a la nueva pieza
        boardTemp[indexZero.y][indexZero.x] = boardTemp[indexZero.y - 1][indexZero.x];
        // Donde está la pieza va el cero
        boardTemp[indexZero.y - 1][indexZero.x] = 0;

        possibleMov.push({
            id: helpers.uniqueID(),
            parent: board.id,
            board: boardTemp,
            see: false,
            value: heuristic(boardTemp),
            mov: "up"
        });
    }
    if (!collision.down && boardIn.mov != 'up') {
        const boardTemp = R.clone(board.board);
        // Donde está el cero será igual a la nueva pieza
        boardTemp[indexZero.y][indexZero.x] = boardTemp[indexZero.y + 1][indexZero.x];
        // Donde está la pieza va el cero
        boardTemp[indexZero.y + 1][indexZero.x] = 0;

        possibleMov.push({
            id: helpers.uniqueID(),
            parent: board.id,
            board: boardTemp,
            see: false,
            value: heuristic(boardTemp),
            mov: "down"
        });
    }
    if (!collision.left && boardIn.mov != 'right') {
        const boardTemp = R.clone(board.board);
        // Donde está el cero será igual a la nueva pieza
        boardTemp[indexZero.y][indexZero.x] = boardTemp[indexZero.y][indexZero.x - 1];
        // Donde está la pieza va el cero
        boardTemp[indexZero.y][indexZero.x - 1] = 0;

        possibleMov.push({
            id: helpers.uniqueID(),
            parent: board.id,
            board: boardTemp,
            see: false,
            value: heuristic(boardTemp),
            mov: "left"
        });
    }
    if (!collision.right && boardIn.mov != 'left') {
        const boardTemp = R.clone(board.board);
        // Donde está el cero será igual a la nueva pieza
        boardTemp[indexZero.y][indexZero.x] = boardTemp[indexZero.y][indexZero.x + 1];
        // Donde está la pieza va el cero
        boardTemp[indexZero.y][indexZero.x + 1] = 0;

        possibleMov.push({
            id: helpers.uniqueID(),
            parent: board.id,
            board: boardTemp,
            see: false,
            value: heuristic(boardTemp),
            mov: "right"
        });
    }
    return possibleMov;
}

export default generatePos;