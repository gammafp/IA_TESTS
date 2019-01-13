import Piezas from '../objects/piezas.js';
import IA from '../IA/IA.js'

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
        const ia = new IA();
        let resolviendo = false;

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
        // Resolver
        this.input.keyboard.on('keydown_I', () => {
            if (!this.piezas.getWin() && !resolviendo) {
                resolviendo = true;
                ia.find(this.piezas.getPiezas(), (rutaSolucion) => {
                    const intervalo = setInterval(() => {
                        const solucion = rutaSolucion.next().value;
                        if (solucion !== undefined) {
                            switch (solucion) {
                                case "up":
                                    this.piezas.up();
                                    break;
                                case "down":
                                    this.piezas.down();
                                    break;
                                case "left":
                                    this.piezas.left();
                                    break;
                                case "right":
                                    this.piezas.right();
                                    break;
                            }
                        } else {
                            clearInterval(intervalo);
                            resolviendo = false;
                            alert('Solucionado');
                        }
                    }, 150);
                });

            }
        });

        this.input.keyboard.on('keydown_R', () => {
            let n = 0,
                dir = ["up", "down", "right", "left"];
            while (n < 300) {
                switch (dir[Math.floor(Math.random() * 4)]) {
                    case "up":
                        if (this.piezas.up()) n++;
                        break;
                    case "down":
                        if (this.piezas.down()) n++;
                        break;
                    case "right":
                        if (this.piezas.right()) n++;
                        break;
                    case "left":
                        if (this.piezas.left()) n++;
                        break;
                }
            }
        
        });
        this.add.text(this.sys.game.config.width/2, 15, 'Hill Climb', {textColor: 0xffffff}).setOrigin(0.5);
        this.add.text(this.sys.game.config.width/2, 170, 'Controles:\n·R:Remover puzzle\n·I:Resolver', {textColor: 0xffffff}).setOrigin(0.5);
    }
}

export default Play;