import helpers from '../share/helpers.js';
import share from '../share/share.js';

class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'Play'
        });
    }

    preload() {
        console.log('Scene: Play');

        // false Para el 0
        // true Para el X
        this.cambiaPieza = false;
    }

    create() {
        const tablero = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'tablero').setAlpha(0);
        this.turno = Phaser.Math.Between(0, 1);
        const empieza = Phaser.Math.Between(0, 1);
        this.cambiaPieza = empieza;

        share.db.jugadorActual = (empieza) ? 'equis' : 'cero';

        // this.equis = this.add.image(this.sys.game.config.width/2 - 25, this.sys.game.config.height/2 - 25, 'equis');    
        this.add.tween({
            targets: tablero,
            alpha: 1,
            duration: 500
        });
        this.buttons = [
            this.add.image(this.sys.game.config.width / 2 - 48, this.sys.game.config.height / 2 - 48, 'position').setName('pos_0').setInteractive(),
            this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 48, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2 + 48, this.sys.game.config.height / 2 - 48, 'position').setInteractive(),
            
            this.add.image(this.sys.game.config.width / 2 - 48, this.sys.game.config.height / 2, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2 + 48, this.sys.game.config.height / 2, 'position').setInteractive(),

            this.add.image(this.sys.game.config.width / 2 - 48, this.sys.game.config.height / 2 + 48, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 48, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2 + 48, this.sys.game.config.height / 2 + 48, 'position').setInteractive()
        ];
        
        // console.log(Phaser.Math.Matrix3.fromArray(share.db.partidaActual));
        this.texto = this.add.text(20, 5, 'Turno de');

        // Deshabilitar los botones si es el primer turno del contrario
        if(this.turno != this.cambiaPieza) {
            // TODO: Empieza la IA por lo tanto se ejecuta minimax y se oculta
            this.texto.setText(
                `PC\njuega con ${(this.cambiaPieza) ? 'X' : 'O'}`
            );
            // this.ocultarBotones();
            // TODO: MARCAR QUE GANA EL PC
            if( helpers.win(share.db.partidaActual, (this.cambiaPieza) ? 1 : 0).win) {
                console.log('Gana ', (this.cambiaPieza) ? 'equis' : 'cero')
            }
        } else {
            // TODO: Se continua normal.
            this.texto.setText(
                `JUGADOR\njuega con ${(this.cambiaPieza) ? 'X' : '0'}`
            );
            console.log(' Es turno del JUGADOR, juega con: ', (this.cambiaPieza) ? 'equis' : 'cero')
        }

        this.buttons.map((x, i) => {
            helpers.createButton(x, this, [], (e) => {
                share.db.partidaActual[helpers.findNumberBi(i).y][helpers.findNumberBi(i).x] = (this.cambiaPieza) ? 1 : 0;

                if( helpers.win(share.db.partidaActual, (this.cambiaPieza) ? 1 : 0).win) {
                    this.colocarBarra(helpers.win(share.db.partidaActual, (this.cambiaPieza) ? 1 : 0));
                    console.log( helpers.win(share.db.partidaActual, (this.cambiaPieza) ? 1 : 0))
                    console.log('Gana ', (this.cambiaPieza) ? 'equis' : 'cero')
                }

                this.ocultarBotones();
                share.db.jugadorActual = this.cambioTurno();
                this.texto.setText(
                    `PC\njuega con ${(this.cambiaPieza) ? 'X' : '0'}`
                );

                // TODO: Lanzar PC

            });
        });

    }
    cambioTurno() {
        this.cambiaPieza = !this.cambiaPieza;
        return (this.cambiaPieza) ? 'equis' : 'cero';
    }

    ocultarBotones() {
        share.db.partidaActual.map((y, yi) => {
            y.map((x, xi) => {
                if(x === -1) {
                    this.buttons[helpers.findNumberOne(xi, yi)].setAlpha(0);
                }
            });
        });
    }

    colocarBarra(barraJSON) {
        let Barra = {};

        // Horizontal
        if(barraJSON.type === 'horizontal') {
            if(barraJSON.pos === 0) {
                Barra = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 48, 'barras', 'barra_horizontal');
            }
            if(barraJSON.pos === 1) {
                Barra = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'barras', 'barra_horizontal');
            }
            if(barraJSON.pos === 2) {
                Barra = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 48, 'barras', 'barra_horizontal');
            }
        }

        // Vertical
        if(barraJSON.type === 'vertical') {
            if(barraJSON.pos === 0) {
                this.add.sprite(this.sys.game.config.width / 2 - 48, this.sys.game.config.height / 2, 'barras', 'barra_vertical');
            }
            if(barraJSON.pos === 1) {
                this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'barras', 'barra_vertical');
            }
            if(barraJSON.pos === 2) {
                this.add.sprite(this.sys.game.config.width / 2 + 48, this.sys.game.config.height / 2, 'barras', 'barra_vertical');
            }
        }
        
        // diagonal
        console.log(barraJSON)
        if(barraJSON.type === 'diagonal') {
            if(barraJSON.pos === 0) {
                this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'barras', 'barra_diagonal');
            }
            if(barraJSON.pos === 1) {
                this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'barras', 'barra_diagonal').setFlip(true);
            }
        }
    }

    update() {

    }
}

export default Play;