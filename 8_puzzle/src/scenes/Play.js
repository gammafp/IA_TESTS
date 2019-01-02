import helpers from '../helpers/helpers.js';

class Play extends Phaser.Scene {
    constructor() {
        super({key: 'Play'});
    }
    
    preload() {
        console.log('Scene: Play');
    }

    create() {
        this.piezas = [];

        this.add.image(this.sys.game.config.width/2, 80, 'marco_piezas');
        
        this.piezas.push(this.physics.add.sprite(this.sys.game.config.width/2 - 32, 80 - 32, 'piezas', 'piezas_1').setName('pieza_1'));
        this.piezas.push(this.physics.add.sprite(this.sys.game.config.width/2, 80 - 32, 'piezas', 'piezas_2').setName('pieza_2'));
        this.piezas.push(this.physics.add.sprite(this.sys.game.config.width/2 + 32, 80 - 32, 'piezas', 'piezas_3').setName('pieza_3'));

        this.piezas.push(this.physics.add.sprite(this.sys.game.config.width/2 - 32, 80, 'piezas', 'piezas_4').setName('pieza_4'));
        this.piezas.push(this.physics.add.sprite(this.sys.game.config.width/2, 80, 'piezas', 'piezas_5').setName('pieza_5'));
        this.piezas.push(this.physics.add.sprite(this.sys.game.config.width/2 + 32, 80, 'piezas', 'piezas_6').setName('pieza_6'));

        this.piezas.push(this.physics.add.sprite(this.sys.game.config.width/2 - 32, 80 + 32, 'piezas', 'piezas_7').setName('pieza_7'));
        this.piezas.push(this.physics.add.sprite(this.sys.game.config.width/2, 80 + 32, 'piezas', 'piezas_8').setName('pieza_8').setInteractive());
        this.piezas.push(this.add.sprite(this.sys.game.config.width/2 + 32, 80 + 32, 'piezas', 'piezas_9').setName('pieza_9'));

        console.log(helpers.oneToBi(this.piezas));

        console.log(1)
        console.log(helpers.findBi(1));
        console.log(3)
        console.log(helpers.findBi(3));
        console.log(5)
        console.log(helpers.findBi(5));
        console.log(8)
        console.log(helpers.findBi(8));
        

        this.input.setDraggable(this.piezas[7]);

        this.input.on('gameobjectdown', function (pointer, gameObject) {

            console.log(helpers.getIndex(this.piezas, gameObject.name));
            gameObject.setTint(0x00ff00);
    
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });

        this.physics.add.collider(this.piezas[7], this.piezas[4]);
        this.physics.add.collider(this.piezas[7], this.piezas[3]);
        this.physics.add.collider(this.piezas[7], this.piezas[5]);
        this.physics.add.collider(this.piezas[7], this.piezas[6]);
        this.physics.add.collider(this.piezas[7], this.piezas[2]);
        this.physics.add.collider(this.piezas[7], this.piezas[1]);

    }

    update() {

    }
}

export default Play;
