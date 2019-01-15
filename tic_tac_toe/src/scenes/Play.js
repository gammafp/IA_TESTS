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
        this.turno = false;
    }

    create() {
        const tablero = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'tablero').setAlpha(0);
        // this.equis = this.add.image(this.sys.game.config.width/2 - 25, this.sys.game.config.height/2 - 25, 'equis');    
        this.add.tween({
            targets: tablero,
            alpha: 1,
            duration: 500
        });

        this.buttons = [
            this.add.image(this.sys.game.config.width / 2 - 48, this.sys.game.config.height / 2 - 48, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 48, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2 + 48, this.sys.game.config.height / 2 - 48, 'position').setInteractive(),
            
            this.add.image(this.sys.game.config.width / 2 - 48, this.sys.game.config.height / 2, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2 + 48, this.sys.game.config.height / 2, 'position').setInteractive(),

            this.add.image(this.sys.game.config.width / 2 - 48, this.sys.game.config.height / 2 + 48, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 48, 'position').setInteractive(),
            this.add.image(this.sys.game.config.width / 2 + 48, this.sys.game.config.height / 2 + 48, 'position').setInteractive()
        ];

        this.buttons.map((x, i) => {
            helpers.createButton(x, this, [], (e) => {
                share.db.jugadorActual = this.cambioTurno();
            });
        });

    }
    cambioTurno() {
        this.turno = !this.turno;
        return (this.turno) ? 'equis' : 'cero';
    }

    update() {

    }
}

export default Play;