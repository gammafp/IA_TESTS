import helpers from './helperIA.js';

// O == 0, X == 1
class IA {
    constructor(pc) {
        this.PC = pc;
    }
    MiniMax(tableroIN, callback) {
        let max = -10;
        let maxActual = 10;
        let mejorMovimiento = 0;

        const tablero = R.clone(R.flatten(tableroIN));

        for(let i = 0; i < tablero.length; i++) {
            if(tablero[i] === -1) {
                tablero[i] = this.PC;
                maxActual = this.Mini(tablero, this.PC);
                if(maxActual > max) {
                    max = maxActual;
                    mejorMovimiento = i;
                }
                tablero[i] = -1;
            }
        }
        callback(mejorMovimiento);
    }
    Mini(tableroIN) {
        const tablero = R.clone(tableroIN);
        if (helpers.win(tablero, this.PC).win === 1) {
            return 1;
        }
        if (helpers.win(tablero, this.PC).win === -1) {
            return 0;
        } else {
            var mejor = 10;
            var nTablero = tablero.length;
            var respuesta;
            for (var i = 0; i < nTablero; i++) {
                if ( tablero[i] === -1 ) {
                    tablero[i] = (this.PC) ? 0 : 1;
                    respuesta = this.Max(tablero, this.PC);
                    if (respuesta < mejor) {
                        mejor = respuesta;
                    }
                    tablero[i] = -1;
                }
            }
            return mejor;
        }
    }
    Max(tableroIN) {
        const tablero = R.clone(tableroIN);
        if (helpers.win(tablero, (this.PC) ? 0 : 1).win === 1) {
            return -1;
        }
        if (helpers.win(tablero, (this.PC) ? 0 : 1).win === -1) {
            return 0;
        } else {
            var mejor = -10;
            var nTablero = tablero.length;
            var respuesta;
            for (var i = 0; i < nTablero; i++) {
                if ( tablero[i] === -1 ) {
                    tablero[i] = this.PC;
                    respuesta = this.Mini(tablero, this.PC);
                    if (respuesta > mejor) {
                        mejor = respuesta;
                    }
                    tablero[i] = -1;
                }
    
            }
            return mejor;
        }
    }
}

export default IA;