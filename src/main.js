import * as PIXI from 'pixi.js';
import * as Stats from 'stats.js';

import Engine from './core/engine';
import Log from './entity/log';
import Pylon from './entity/pylon';

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
    for (let d = 75; d <= 225; d += 25) {
        engine.stage.addChild(new Pylon(d, 100));
    }

    const style = new PIXI.TextStyle({
        fontFamily: 'Courier New',
        fontSize: 18,
        lineJoin: 'round',
        fill: 'white',
    });

    const basicText = new PIXI.Text('ROOM 1', style);
    basicText.x = 10;
    basicText.y = 180;
    engine.stage.addChild(basicText);

    // End Temp Setup

    animate();
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
