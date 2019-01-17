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

const findNumberBi = (index) => ({
    x: index % 3,
    y: Math.floor(index / 3)
});

const win = (tableroIN, turno) => {
    const tablero = oneToBi(tableroIN);
    let output = {
        win: 0
    };
    if(R.all((x) => x !== -1, R.flatten(tablero))) {
        output = {
            win: -1
        };
    }
    // Horizontal
    if (R.all(R.equals(turno), [tablero[0][0], tablero[0][1], tablero[0][2]])) {
        output = {
            win: 1,
            type: 'horizontal',
            pos: 0
        }
    }
    if (R.all(R.equals(turno), [tablero[1][0], tablero[1][1], tablero[1][2]])) {
        output = {
            win: 1,
            type: 'horizontal',
            pos: 1
        }
    }
    if (R.all(R.equals(turno), [tablero[2][0], tablero[2][1], tablero[2][2]])) {
        output = {
            win: 1,
            type: 'horizontal',
            pos: 2
        }
    }

    // Vertical
    if (R.all(R.equals(turno), [tablero[0][0], tablero[1][0], tablero[2][0]])) {
        output = {
            win: 1,
            type: 'vertical',
            pos: 0
        }
    }
    if (R.all(R.equals(turno), [tablero[0][1], tablero[1][1], tablero[2][1]])) {
        output = {
            win: 1,
            type: 'vertical',
            pos: 1
        }
    }
    if (R.all(R.equals(turno), [tablero[0][2], tablero[1][2], tablero[2][2]])) {
        output = {
            win: 1,
            type: 'vertical',
            pos: 2
        }
    }

    // Diagonal
    if (R.all(R.equals(turno), [tablero[0][0], tablero[1][1], tablero[2][2]])) {
        output = {
            win: 1,
            type: 'diagonal',
            pos: 0
        }
    }
    if (R.all(R.equals(turno), [tablero[0][2], tablero[1][1], tablero[2][0]])) {
        output = {
            win: 1,
            type: 'diagonal',
            pos: 1
        }
    }
    return output;
}

export default {
    oneToBi,
    win,
    findNumberBi
};