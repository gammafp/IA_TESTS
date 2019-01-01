import Bootloader from './Bootloader.js';

const config = {
    title: "8_puzzle",
    width: 360,
    height: 640,
    type: Phaser.AUTO,
    parent: "container",
    backgroundColor: "#22a6b3",
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