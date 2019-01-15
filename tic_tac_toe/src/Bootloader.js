class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('tablero');
        this.load.image('equis');
        this.load.image('cero');
        this.load.image('equis_opaco');
        this.load.image('cero_opaco');
        this.load.image('position');

        this.load.on('complete', () => {
            this.scene.start('Play');
        });
    }

    create() {
    }
}
export default Bootloader;