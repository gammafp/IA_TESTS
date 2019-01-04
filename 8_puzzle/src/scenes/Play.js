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

        this.input.keyboard.on('keydown_UP', () => {
            this.piezas.up();
        });
        
        this.input.keyboard.on('keydown_DOWN', () => {
            this.piezas.down();
        });
        
        this.input.keyboard.on('keydown_LEFT', () => {
            this.piezas.left();
        });
        
        this.input.keyboard.on('keydown_RIGHT', () => {
            this.piezas.right();
        });
    }

    update() {

    }
}

export default Play;