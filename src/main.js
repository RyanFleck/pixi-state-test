import * as PIXI from 'pixi.js';
import * as Stats from 'stats.js';

import Engine from './inc/engine';
import Log from './inc/log';

const stats = new Stats();
stats.showPanel(0);

// PIXI Config
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

// PIXI Aliases as noted in README resources.
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const Sprite = PIXI.Sprite;

// Important Game Elements
const engine = new Engine();

function game() {
    engine.resize();

    document.getElementById('loading').remove();
    document.body.appendChild(engine.app.view);
    document.body.appendChild(stats.dom);

    // Temp Setup

    const p = new PIXI.Graphics();
    p.beginFill(0xFFFFFF);
    p.lineStyle(0);
    p.drawCircle(100, 100, 10);
    p.endFill();

    p.x = 50;
    p.y = 50;

    engine.stage.addChild(p);

    // End Temp Setup

    animate();
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
