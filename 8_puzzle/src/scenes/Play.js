import helpers from '../helpers/helpers.js';

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
        this.piezas = [];
        let lastPos = {};
        let pieceCollision = {};

        this.add.image(this.sys.game.config.width / 2, 80, 'marco_piezas');

        this.piezas.push(this.add.sprite(this.sys.game.config.width / 2 - 32, 80 - 32, 'piezas', 'piezas_1').setName('pieza_1').setInteractive());
        this.piezas.push(this.add.sprite(this.sys.game.config.width / 2, 80 - 32, 'piezas', 'piezas_2').setName('pieza_2').setInteractive());
        this.piezas.push(this.add.sprite(this.sys.game.config.width / 2 + 32, 80 - 32, 'piezas', 'piezas_3').setName('pieza_3').setInteractive());

        this.piezas.push(this.add.sprite(this.sys.game.config.width / 2 - 32, 80, 'piezas', 'piezas_4').setName('pieza_4').setInteractive());
        this.piezas.push(this.add.sprite(this.sys.game.config.width / 2, 80, 'piezas', 'piezas_5').setName('pieza_5').setInteractive());
        this.piezas.push(this.add.sprite(this.sys.game.config.width / 2 + 32, 80, 'piezas', 'piezas_6').setName('pieza_6').setInteractive());

        this.piezas.push(this.add.sprite(this.sys.game.config.width / 2 - 32, 80 + 32, 'piezas', 'piezas_7').setName('pieza_7').setInteractive());
        this.piezas.push(this.add.sprite(this.sys.game.config.width / 2, 80 + 32, 'piezas', 'piezas_8').setName('pieza_8').setInteractive());
        this.piezas.push(this.add.sprite(this.sys.game.config.width / 2 + 32, 80 + 32, 'piezas', 'piezas_9').setName('vacio'));

        for (let i = 0; i < 8; i++) {
            this.input.setDraggable(this.piezas[i])
        }

        this.input.on('gameobjectdown', function (pointer, gameObject) {
            const indexPiece = helpers.getIndex(this.piezas, gameObject.name);

            // Chequea las colisiones
            pieceCollision = helpers.checkCollition(indexPiece, this.piezas);

        }, this);

        this.input.on('dragstart', function (pointer, gameObject) {
            lastPos = {
                x: gameObject.x,
                y: gameObject.y
            }
            gameObject.setTint(0x00ff00);
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            // console.log(lastPos.x)
            if (!pieceCollision.left) {
                if (gameObject.x  <= lastPos.x && gameObject.x > lastPos.x - 33) {
                    if(dragX > lastPos.x) {
                        gameObject.x = lastPos.x;
                    } else if(dragX < lastPos.x - 32) {
                        gameObject.x = lastPos.x - 32;
                    } 
                    else {
                        gameObject.x = dragX;
                    }
                }
            }
            if (!pieceCollision.right) {
                if (gameObject.x  >= lastPos.x && gameObject.x < lastPos.x + 33) {
                    if(dragX < lastPos.x) {
                        gameObject.x = lastPos.x;
                    } else if(dragX > lastPos.x + 32) {
                        gameObject.x = lastPos.x + 32;
                    } 
                    else {
                        gameObject.x = dragX;
                    }
                }
            }
            if (!pieceCollision.up) {
                
                if (gameObject.y  <= lastPos.y && gameObject.y > lastPos.y - 33) {
                    if(dragY > lastPos.y) {
                        gameObject.y = lastPos.y;
                    } else if(dragY < lastPos.y - 32) {
                        gameObject.y = lastPos.y - 32;
                    } 
                    else {
                        gameObject.y = dragY;
                    }
                }
            }
            if (!pieceCollision.down) {


                if (gameObject.y  >= lastPos.y && gameObject.y < lastPos.y + 33) {
                    if(dragY < lastPos.y) {
                        gameObject.y = lastPos.y;
                    } else if(dragY > lastPos.y + 32) {
                        gameObject.y = lastPos.y + 32;
                    } 
                    else {
                        gameObject.y = dragY;
                    }
                }

            }



        });

        this.input.on('dragend', function (pointer, gameObject) {
            //Obtenemos tanto el index de la pieza seleccionada como el del espacio vacio
            const indexPiece = helpers.getIndex(this.piezas, gameObject.name);
            let vIndex = helpers.getIndex(this.piezas, 'vacio')

            //De estar en rango, intercambiamos posiciones en el array y en el plano, en caso contrario se regresa a la posición original
            if (Phaser.Math.Distance.Between(gameObject.x, gameObject.y, this.piezas[vIndex].x, this.piezas[vIndex].y) < 32) {
                console.log("En rango")
                gameObject.x = this.piezas[vIndex].x
                gameObject.y = this.piezas[vIndex].y
                this.piezas[vIndex].x = lastPos.x
                this.piezas[vIndex].y = lastPos.y
                helpers.swap(indexPiece, vIndex, this.piezas)
                console.log(this.piezas)
            } else {
                gameObject.x = lastPos.x;
                gameObject.y = lastPos.y;
            }
            gameObject.clearTint();

        }, this);

    }

    update() {

    }
}

export default Play;