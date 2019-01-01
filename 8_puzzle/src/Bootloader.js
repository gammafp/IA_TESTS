class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('logo_gamma');
        this.load.image('marco_piezas');
        this.load.atlas('piezas', 'piezas.png', 'piezas_atlas.json');

        this.load.on('complete', () => {
            this.scene.start('Play');
        });
    }
}
export default Bootloader;