import {
    Graphics, Sprite, Text, TextStyle,
} from 'pixi.js';


/* Usage:
 *   Log.log('Basic log.');
 *   Log.warn('Warning message.');
 *   Log.error('Error has occured.');
 */
class Pylon {
    constructor(x, y) {
        const p = new Graphics();
        p.beginFill(0xF39C12);
        p.lineStyle(0);
        p.drawRect(0, 0, 5, 10);
        p.endFill();
        const pylonSprite = new Sprite(p.generateCanvasTexture());
        pylonSprite.interactive = true;
        pylonSprite.buttonMode = true;
        pylonSprite.anchor.set(0.5);
        pylonSprite.on('pointerdown', this.onDragStart);
        pylonSprite.on('pointerup', this.onDragEnd);
        pylonSprite.on('pointerupoutside', this.onDragEnd);
        pylonSprite.on('pointermove', this.onDragMove);
        pylonSprite.x = x;
        pylonSprite.y = y;
        return pylonSprite;
    }

    onDragStart(event) {
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }
}

export default Pylon;
