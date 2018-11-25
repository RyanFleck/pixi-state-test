import { Application } from 'pixi.js';
import Log from '../entity/log';


class Engine {
    constructor(w, h) {
        Log.log('>> Engine() - Initializing Engine.');
        this.w = 300;
        this.h = 200;
        this.scale = 1;
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
        this.mouse = this.app.renderer.plugins.interaction.mouse.global;
        Log.log(`<< Engine() - PIXI Engine Initialized - Dimensions: ${this.w}x${this.h}`);

        window.addEventListener('resize', () => {
            this.resize();
        }, false);
    }

    orderStageByZPos() {
        this.app.stage.children.sort((a, b) => a.y - b.y);
    }

    resize() {
        let newscale = Math.min(
            window.innerWidth / this.w,
            window.innerHeight / this.h,
        );

        if (newscale < 1) {
            newscale = 1;
        } else {
            newscale = Math.floor(newscale * 2) / 2;
        }

        if (newscale !== this.scale) {
            this.app.renderer.resize(
                Math.floor(this.w * newscale),
                Math.floor(this.h * newscale),
            );
            this.scale = newscale;
            this.app.stage.scale.set(newscale);
            Log.log(`Scaling to ${newscale}`);
        }
    }
}

export default Engine;
