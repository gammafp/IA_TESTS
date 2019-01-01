
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
        this.piezas.push(this.physics.add.sprite(this.sys.game.config.width/2, 80 + 32, 'piezas', 'piezas_8').setName('pieza_8'));
        this.piezas.push(this.add.sprite(this.sys.game.config.width/2 + 32, 80 + 32, 'piezas', 'piezas_9').setName('pieza_9'));

        setTimeout(() => {
            console.log(this.piezas)
        }, 2000);
    }

    update() {

    }
}

export default Play;
