import Restart from './scenes/Restart.js';
import Play from './scenes/Play.js';
import Bootloader from './Bootloader.js';

const config = {
    title: "8_puzzle",
    width: 180,
    height: 220,
    type: Phaser.AUTO,
    parent: "container",
    backgroundColor: "#17111a",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                // y: 500
            }, 
            debug: true
        }
    },
    scene: [Bootloader, Play, Restart]
};

new Phaser.Game(config);