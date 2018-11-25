import * as PIXI from 'pixi.js';
import * as Stats from 'stats.js';

import Engine from './inc/engine';
import Log from './inc/log';
import Pylon from './inc/pylon';

const stats = new Stats();
stats.showPanel(0);

// PIXI Config
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

// Important Game Elements
const engine = new Engine();

function game() {
    engine.resize();

    document.getElementById('loading').remove();
    document.body.appendChild(engine.app.view);
    document.body.appendChild(stats.dom);

    // Temp Setup


    engine.stage.addChild(testGrid());
    engine.stage.addChild(testPoint(100, 100));
    engine.stage.addChild(new Pylon(150, 100));
    engine.stage.addChild(new Pylon(170, 100));

    // End Temp Setup

    animate();
}

function testPoint(x, y) {
    const p = new PIXI.Graphics();
    p.beginFill(0x48C9B0);
    p.lineStyle(0);
    p.drawCircle(0, 0, 2);
    p.endFill();
    p.x = x;
    p.y = y;
    return p;
}

function testGrid() {
    Log.log('<> Gen testgrid.');
    const p = new PIXI.Graphics();
    const linecolor = 0x260A27;
    const linedensity = 25;

    for (let x = linedensity; x < 300; x += linedensity) {
        p.lineStyle(1, linecolor);
        p.moveTo(x, 0);
        p.lineTo(x, 200);
    }

    for (let y = linedensity; y < 200; y += linedensity) {
        p.lineStyle(1, linecolor);
        p.moveTo(0, y);
        p.lineTo(300, y);
    }

    return p;
}




function animate() {
    stats.begin();

    engine.orderStageByZPos();

    stats.end();

    requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', () => {
    game();
    Log.log('<> Game loaded.');
});
