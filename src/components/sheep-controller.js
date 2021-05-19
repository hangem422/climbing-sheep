import LinkedList from '../utils/data-structure/linked-list.js';
import Sheep from './sheep.js';

const DEFAULT_FPS = 24;
const DEFAULT_WIDTH = 360;
const DEFAULT_HEIGHT = 380;
const DEFAULT_CYCLE = 200;

class SheepController {
  constructor(src, frame, opts = {}) {
    this.img = new Image();
    this.img.onload = this.loaded.bind(this);
    this.img.src = src;

    this.frame = frame;
    this.fps = opts.fps ?? DEFAULT_FPS;
    this.imgWitdh = opts.width ?? DEFAULT_WIDTH;
    this.imgHeight = opts.height ?? DEFAULT_HEIGHT;
    this.offset = opts.offset ?? {};

    this.items = new LinkedList();
    this.stageWidth = 0;
    this.stageHeight = 0;

    this.cycle = opts.cycle ?? DEFAULT_CYCLE;
    this.curCycle = 0;
    this.isLoaded = false;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  loaded() {
    this.isLoaded = true;
    this.addSheep();
  }

  addSheep() {
    this.items.push(
      new Sheep(
        this.img,
        this.frame,
        this.fps,
        this.imgWitdh,
        this.imgHeight,
        this.offset,
        this.stageWidth,
      ),
    );
  }

  draw(ctx, t, curves) {
    if (!this.isLoaded) return;

    this.curCycle = (this.curCycle + 1) % this.cycle;
    if (this.curCycle === 0) this.addSheep();

    for (const node of this.items.generateNodes()) {
      const sheep = node.value;

      if (sheep.visible) sheep.draw(ctx, t, curves);
      else this.items.deleteNode(node);
    }
  }
}

export default SheepController;
