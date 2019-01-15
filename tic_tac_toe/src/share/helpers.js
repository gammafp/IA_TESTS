import share from './share.js';
// ['position', `${share.db.jugadorActual}_opaco`, share.db.jugadorActual]
const createButton = (buttonSprite, scene, frames, callback) => {
    buttonSprite.on('pointerover', () => {        
        buttonSprite.frame = scene.textures.getFrame(`${share.db.jugadorActual}_opaco`);
    });
    buttonSprite.on('pointerdown', () => {
        buttonSprite.frame = scene.textures.getFrame(share.db.jugadorActual);
    });
    buttonSprite.on('touchout', () => {
        alert('Funcionaaa');
    })
    buttonSprite.on('pointerout', () => {
        buttonSprite.frame = scene.textures.getFrame('position');
    });
    buttonSprite.on('pointerup', (a) => {
        buttonSprite.frame = scene.textures.getFrame(share.db.jugadorActual);
        buttonSprite.removeInteractive();
        callback(buttonSprite);
    });
} 

export default { createButton };