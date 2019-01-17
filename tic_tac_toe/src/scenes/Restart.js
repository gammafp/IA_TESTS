
class Restart extends Phaser.Scene {
    constructor() {
        super({key: 'Restart'});
    }
    
    preload() {
        this.scene.start('Play');
    }

    create() {
        
    }

    update() {

    }
}

export default Restart;
