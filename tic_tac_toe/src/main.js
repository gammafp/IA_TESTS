import Bootloader from './Bootloader.js';

const config = {
    title: "OXO",
    width: 180,
    height: 220,
    type: Phaser.AUTO,
    parent: "container",
    backgroundColor: "#c7ecee",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500
            }
        }
    },
    scene: [
        Bootloader
    ]
};

new Phaser.Game(config);