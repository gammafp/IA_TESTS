import share from './share.js';
// ['position', `${share.db.jugadorActual}_opaco`, share.db.jugadorActual]
const createButton = (buttonSprite, scene, frames, callback) => {
    buttonSprite.on('pointerover', () => {
        buttonSprite.frame = scene.textures.getFrame(`${share.db.jugadorActual}_opaco`);
    });
    buttonSprite.on('pointerdown', () => {
        buttonSprite.frame = scene.textures.getFrame(share.db.jugadorActual);
    });
    buttonSprite.on('touchout', () => {
        alert('Funcionaaa');
    })
    buttonSprite.on('pointerout', () => {
        buttonSprite.frame = scene.textures.getFrame('position');
    });
    buttonSprite.on('pointerup', (a) => {
        buttonSprite.frame = scene.textures.getFrame(share.db.jugadorActual);
        buttonSprite.removeInteractive();
        callback(buttonSprite);
    });
}

/**
 * Encontramos la posición bi-dimensional en base a un número en la matriz 3x3
 * @param {Number} index 
 * @return \{x: number, y: number}
 */
const findNumberBi = (index) => ({
    x: index % 3,
    y: Math.floor(index / 3)
});

const findNumberOne = (indexX, indexY) => (indexY*3 + indexX);

const win = (tablero, turno) => {
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
    createButton,
    findNumberBi,
    win,
    findNumberOne
};