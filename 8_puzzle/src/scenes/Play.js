import Piezas from '../objects/piezas.js';

class Play extends Phaser.Scene {
    constructor() {
        super({
            key: 'Play'
        });
    }

    preload() {
        console.log('Scene: Play');
    }

    create() {

        this.add.image(this.sys.game.config.width / 2, 80, 'marco_piezas');
        this.piezas = new Piezas(this);
        this.piezas.startDrag();
    }

    update() {

    }
}

export default Play;