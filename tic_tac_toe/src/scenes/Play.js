import helpers from '../share/helpers.js';
import share from '../share/share.js';
import IA from '../IA/IA.js';

class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'Play'
        });
    }

    preload() {
        console.log('Scene: Play');

        // 0 Para el O
        // 1 Para el X
        this.cambiaPieza = false;
    }

    create() {
        const tablero = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'tablero').setAlpha(0);
        this.turno = Phaser.Math.Between(0, 1);
        const empieza = Phaser.Math.Between(0, 1);
        this.cambiaPieza = empieza;

        const IAMini = new IA((this.turno != this.cambiaPieza) ? (this.cambiaPieza) ? 1 : 0 : (!this.cambiaPieza) ? 1 : 0);

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
        const reload = this.add.image(this.sys.game.config.width - 20, this.sys.game.config.height - 20, 'reload').setInteractive();
        
        reload.on('pointerup', () => {
            share.restartDB();
            this.scene.start('Restart');
        });

        // console.log(Phaser.Math.Matrix3.fromArray(share.db.partidaActual));
        this.texto = this.add.text(20, 5, 'Turno de');

        // Deshabilitar los botones si es el primer turno del contrario
        if (this.turno != this.cambiaPieza) {
            this.texto.setText(
                `PC`
            );
            this.ocultarBotones();
            this.pintarPC(Phaser.Math.Between(0, 8), IAMini.PC, () => {
                this.mostrarBotones();
                share.db.jugadorActual = this.cambioTurno();
                this.texto.setText(
                    `JUGADOR`
                );
            });
        } else {
            this.texto.setText(
                `JUGADOR`
            );
        }

        this.buttons.map((x, i) => {
            helpers.createButton(x, this, [], (e) => {
                this.texto.setText(
                    `PC`
                );

                share.db.partidaActual[helpers.findNumberBi(i).y][helpers.findNumberBi(i).x] = (this.cambiaPieza) ? 1 : 0;

                const comprobarWin = helpers.win(share.db.partidaActual, (this.cambiaPieza) ? 1 : 0).win;

                if (comprobarWin === 1) {
                    this.ocultarBotones();
                    this.colocarBarra((helpers.win(share.db.partidaActual, (this.cambiaPieza) ? 1 : 0)), 'Jugador');
                    // console.log('Gana ', (this.cambiaPieza) ? 'equis' : 'cero')
                } else if (comprobarWin === -1) {
                    this.ocultarBotones();
                    alert('empate');
                } else {

                    share.db.jugadorActual = this.cambioTurno();

                    // TODO: Lanzar PC
                    this.ocultarBotones();

                    setTimeout(() => {
                        IAMini.MiniMax(share.db.partidaActual, (posIA) => {
                            this.pintarPC(posIA, IAMini.PC, () => {
                                const comprobarWin = helpers.win(share.db.partidaActual, (this.cambiaPieza) ? 1 : 0).win;

                                this.mostrarBotones();

                                if (comprobarWin === 1) {
                                    this.colocarBarra((helpers.win(share.db.partidaActual, (this.cambiaPieza) ? 1 : 0)), 'PC');
                                    this.buttons.map((x) => {
                                        x.removeInteractive()
                                    });
                                    this.ocultarBotones();
                                } else if (comprobarWin === -1) {
                                    this.ocultarBotones();
                                    alert('empate');
                                }

                                share.db.jugadorActual = this.cambioTurno();
                                this.texto.setText(
                                    `JUGADOR`
                                );
                            });
                        });

                    }, 50);

                }
            });
        });

    }
    cambioTurno() {
        this.cambiaPieza = !this.cambiaPieza;
        return (this.cambiaPieza) ? 'equis' : 'cero';
    }

    pintarPC(posicion, jugador, callback) {
        const posXY = helpers.findNumberBi(posicion);
        share.db.partidaActual[posXY.y][posXY.x] = jugador;
        this.buttons[posicion].frame = this.textures.getFrame((jugador) ? 'equis' : 'cero');
        this.buttons[posicion].removeInteractive();
        callback();
    }

    ocultarBotones() {
        share.db.partidaActual.map((y, yi) => {
            y.map((x, xi) => {
                if (x === -1) {
                    this.buttons[helpers.findNumberOne(xi, yi)].setAlpha(0);
                }
            });
        });
    }

    mostrarBotones() {
        share.db.partidaActual.map((y, yi) => {
            y.map((x, xi) => {

                this.buttons[helpers.findNumberOne(xi, yi)].setAlpha(1);

            });
        });
    }

    colocarBarra(barraJSON, ganador) {
        let Barra = {};
        let winner = ganador;

        console.log(winner);
        // Horizontal
        if (barraJSON.type === 'horizontal') {
            if (barraJSON.pos === 0) {
                Barra = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 48, 'barras', 'barra_horizontal');
            }
            if (barraJSON.pos === 1) {
                Barra = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'barras', 'barra_horizontal');
            }
            if (barraJSON.pos === 2) {
                Barra = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 48, 'barras', 'barra_horizontal');
            }
        }

        // Vertical
        if (barraJSON.type === 'vertical') {
            if (barraJSON.pos === 0) {
                this.add.sprite(this.sys.game.config.width / 2 - 48, this.sys.game.config.height / 2, 'barras', 'barra_vertical');
            }
            if (barraJSON.pos === 1) {
                this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'barras', 'barra_vertical');
            }
            if (barraJSON.pos === 2) {
                this.add.sprite(this.sys.game.config.width / 2 + 48, this.sys.game.config.height / 2, 'barras', 'barra_vertical');
            }
        }

        // diagonal
        if (barraJSON.type === 'diagonal') {
            if (barraJSON.pos === 0) {
                this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'barras', 'barra_diagonal');
            }
            if (barraJSON.pos === 1) {
                this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'barras', 'barra_diagonal').setFlip(true);
            }
        }
        setTimeout(() => {
            alert(`Gana: ${winner}`);
        }, 500);
    }

    update() {

    }
}

export default Play;