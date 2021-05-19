import Hill from './hill.js';

const DEFAULT_VERTICAL_LAYER_CNT = 8;
const DEFAULT_COLOR = '#000000';
const DEFAULT_SPEED = 1.0;
const DEFAULT_TOTAL = 6;

class HillController {
  constructor(verticalLayerCnt = DEFAULT_VERTICAL_LAYER_CNT, items = []) {
    this.verticalLayerCnt = verticalLayerCnt;
    this.items = items.map((item) => {
      const color = item.color ?? DEFAULT_COLOR;
      const speed = item.speed ?? DEFAULT_SPEED;
      const total = item.total ?? DEFAULT_TOTAL;

      return new Hill(color, speed, verticalLayerCnt, total);
    });

    this.stageWidth = 0;
    this.stageHeight = 0;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.items.forEach((item) => item.resize(stageWidth, stageHeight));
  }

  addHill(color = DEFAULT_COLOR, speed = DEFAULT_SPEED, total = DEFAULT_TOTAL) {
    const hill = new Hill(color, speed, total);
    hill.resize(this.stageWidth, this.stageHeight);
    this.items[this.items.length] = hill;
  }

  draw(ctx) {
    return this.items.map((item) => item.draw(ctx));
  }
}

export default HillController;
