import helpers from '../helpers/helpers.js';
class Piezas {
    constructor(scene) {
        this.scene = scene;
        this.piezas = [];
        this.generarPiezas();
    }
    generarPiezas() {
        this.piezas.push(this.scene.add.sprite(this.scene.sys.game.config.width / 2 - 32, 80 - 32, 'piezas', 'piezas_1').setName('pieza_1').setInteractive());
        this.piezas.push(this.scene.add.sprite(this.scene.sys.game.config.width / 2, 80 - 32, 'piezas', 'piezas_2').setName('pieza_2').setInteractive());
        this.piezas.push(this.scene.add.sprite(this.scene.sys.game.config.width / 2 + 32, 80 - 32, 'piezas', 'piezas_3').setName('pieza_3').setInteractive());

        this.piezas.push(this.scene.add.sprite(this.scene.sys.game.config.width / 2 - 32, 80, 'piezas', 'piezas_4').setName('pieza_4').setInteractive());
        this.piezas.push(this.scene.add.sprite(this.scene.sys.game.config.width / 2, 80, 'piezas', 'piezas_5').setName('pieza_5').setInteractive());
        this.piezas.push(this.scene.add.sprite(this.scene.sys.game.config.width / 2 + 32, 80, 'piezas', 'piezas_6').setName('pieza_6').setInteractive());

        this.piezas.push(this.scene.add.sprite(this.scene.sys.game.config.width / 2 - 32, 80 + 32, 'piezas', 'piezas_7').setName('pieza_7').setInteractive());
        this.piezas.push(this.scene.add.sprite(this.scene.sys.game.config.width / 2, 80 + 32, 'piezas', 'piezas_8').setName('pieza_8').setInteractive());
        this.piezas.push(this.scene.add.sprite(this.scene.sys.game.config.width / 2 + 32, 80 + 32, 'piezas', 'piezas_9').setName('vacio'));
    }
    startDrag() {
        let lastPos = {};
        let pieceCollision = {};

        for (let i = 0; i < 8; i++) {
            this.scene.input.setDraggable(this.piezas[i])
        }

        this.scene.input.on('gameobjectdown', (pointer, gameObject) => {
            const indexPiece = helpers.getIndex(this.piezas, gameObject.name);

            // Chequea las colisiones
            pieceCollision = helpers.checkCollition(indexPiece, this.piezas);

        }, this);

        this.scene.input.on('dragstart', (pointer, gameObject) => {
            lastPos = {
                x: gameObject.x,
                y: gameObject.y
            }
            gameObject.setTint(0x00ff00);
        });

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            // console.log(lastPos.x)
            if (!pieceCollision.left) {
                if (gameObject.x <= lastPos.x && gameObject.x > lastPos.x - 33) {
                    if (dragX > lastPos.x) {
                        gameObject.x = lastPos.x;
                    } else if (dragX < lastPos.x - 32) {
                        gameObject.x = lastPos.x - 32;
                    } else {
                        gameObject.x = dragX;
                    }
                }
            }
            if (!pieceCollision.right) {
                if (gameObject.x >= lastPos.x && gameObject.x < lastPos.x + 33) {
                    if (dragX < lastPos.x) {
                        gameObject.x = lastPos.x;
                    } else if (dragX > lastPos.x + 32) {
                        gameObject.x = lastPos.x + 32;
                    } else {
                        gameObject.x = dragX;
                    }
                }
            }
            if (!pieceCollision.up) {

                if (gameObject.y <= lastPos.y && gameObject.y > lastPos.y - 33) {
                    if (dragY > lastPos.y) {
                        gameObject.y = lastPos.y;
                    } else if (dragY < lastPos.y - 32) {
                        gameObject.y = lastPos.y - 32;
                    } else {
                        gameObject.y = dragY;
                    }
                }
            }
            if (!pieceCollision.down) {
                if (gameObject.y >= lastPos.y && gameObject.y < lastPos.y + 33) {
                    if (dragY < lastPos.y) {
                        gameObject.y = lastPos.y;
                    } else if (dragY > lastPos.y + 32) {
                        gameObject.y = lastPos.y + 32;
                    } else {
                        gameObject.y = dragY;
                    }
                }
            }
        });

        this.scene.input.on('dragend', (pointer, gameObject) => {
            //Obtenemos tanto el index de la pieza seleccionada como el del espacio vacio
            const indexPiece = helpers.getIndex(this.piezas, gameObject.name);
            let vIndex = helpers.getIndex(this.piezas, 'vacio')

            //De estar en rango, intercambiamos posiciones en el array y en el plano, en caso contrario se regresa a la posición original
            if (Phaser.Math.Distance.Between(gameObject.x, gameObject.y, this.piezas[vIndex].x, this.piezas[vIndex].y) < 32) {
                gameObject.x = this.piezas[vIndex].x
                gameObject.y = this.piezas[vIndex].y
                this.piezas[vIndex].x = lastPos.x
                this.piezas[vIndex].y = lastPos.y
                helpers.swap(indexPiece, vIndex, this.piezas)
            } else {
                gameObject.x = lastPos.x;
                gameObject.y = lastPos.y;
            }
            gameObject.clearTint();
            if (helpers.win(this.piezas)) {
                console.log('Puzzle resuelto')
            } else {
                console.log('No resuelto')
            }
        }, this);
    }
    up() {
        const indexVacio = helpers.getIndex(this.piezas, 'vacio');
        const indexVacioBi = helpers.findBi(indexVacio);
        const piezasBi = helpers.oneToBi(this.piezas);

        const collision = helpers.checkCollitionIA(indexVacio, this.piezas);
        if (!collision.up) {
            const indexPieceToMove = helpers.getIndex(this.piezas, piezasBi[indexVacioBi.y - 1][indexVacioBi.x].name);

            // TODO: Aplicar catmull/lerp

            // Pieza a mover
            piezasBi[indexVacioBi.y - 1][indexVacioBi.x].y += 32;
            // Vacio
            piezasBi[indexVacioBi.y][indexVacioBi.x].y -= 32;

            helpers.swap(indexPieceToMove, indexVacio, this.piezas);
        }
    }
    down() {
        const indexVacio = helpers.getIndex(this.piezas, 'vacio');
        const indexVacioBi = helpers.findBi(indexVacio);
        const piezasBi = helpers.oneToBi(this.piezas);

        const collision = helpers.checkCollitionIA(indexVacio, this.piezas);
        if (!collision.down) {
            const indexPieceToMove = helpers.getIndex(this.piezas, piezasBi[indexVacioBi.y + 1][indexVacioBi.x].name);

            // TODO: Aplicar catmull/lerp

            // Pieza a mover
            piezasBi[indexVacioBi.y + 1][indexVacioBi.x].y -= 32;
            // Vacio
            piezasBi[indexVacioBi.y][indexVacioBi.x].y += 32;

            helpers.swap(indexPieceToMove, indexVacio, this.piezas);
        }
    }
    left() {
        const indexVacio = helpers.getIndex(this.piezas, 'vacio');
        const indexVacioBi = helpers.findBi(indexVacio);
        const piezasBi = helpers.oneToBi(this.piezas);

        const collision = helpers.checkCollitionIA(indexVacio, this.piezas);

        if (!collision.left) {
            const indexPieceToMove = helpers.getIndex(this.piezas, piezasBi[indexVacioBi.y][indexVacioBi.x - 1].name);

            // TODO: Aplicar catmull/lerp

            // Pieza a mover
            piezasBi[indexVacioBi.y][indexVacioBi.x - 1].x += 32;
            // vacio
            piezasBi[indexVacioBi.y][indexVacioBi.x].x -= 32;

            helpers.swap(indexPieceToMove, indexVacio, this.piezas);
        }
    }
    right() {
        const indexVacio = helpers.getIndex(this.piezas, 'vacio');
        const indexVacioBi = helpers.findBi(indexVacio);
        const piezasBi = helpers.oneToBi(this.piezas);

        const collision = helpers.checkCollitionIA(indexVacio, this.piezas);

        if (!collision.right) {
            const indexPieceToMove = helpers.getIndex(this.piezas, piezasBi[indexVacioBi.y][indexVacioBi.x + 1].name);

            // TODO: Aplicar catmull/lerp

            // Pieza a mover
            piezasBi[indexVacioBi.y][indexVacioBi.x + 1].x -= 32;

            // Vacio
            piezasBi[indexVacioBi.y][indexVacioBi.x].x += 32;

            helpers.swap(indexPieceToMove, indexVacio, this.piezas);
        }
    }

}

export default Piezas;