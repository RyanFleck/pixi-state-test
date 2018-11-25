import * as PIXI from 'pixi.js';
import Log from './log';

const Application = PIXI.Application;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

class Engine {
    constructor(w, h) {
        Log.log('>> Engine() - Initializing Engine.');
        this.w = 300;
        this.h = 200;
        this.app = new Application(w, h, {
            antialias: false,
            transparent: false,
            roundPixels: true,
            resolution: window.devicePixelRatio || 1,
        });
        this.app.view.style.display = 'block';
        this.app.view.id = 'game';
        this.app.autoResize = true;
        this.stage = this.app.stage; // Map the container object to a shorter alias.
        this.renderer = this.app.renderer;
        this.view = this.app.view;
        Log.log(`<< Engine() - PIXI Engine Initialized - Dimensions: ${this.w}x${this.h}`);

        window.addEventListener('resize', () => {
            this.resize();
        }, false);
    }

    orderStageByZPos() {
        this.app.stage.children.sort((a, b) => a.y - b.y);
    }

    resize() {
        const scale = Math.min(
            window.innerWidth / this.w,
            window.innerHeight / this.h,
        );

        this.app.renderer.resize(
            Math.ceil(this.w * scale),
            Math.ceil(this.h * scale),
        );

        this.app.stage.scale.set(scale);
    }
}

export default Engine;
