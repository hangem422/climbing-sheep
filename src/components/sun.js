import Point from '../utils/quadratic/point.js';

const DEFAULT_RADIUS = 200;
const DEFAULT_COLOR = '#ffb200';
const DEFAULT_RIGHT_OFFSET = 0;
const DEFAULT_TOP_OFFSET = 0;

const DEFUALT_DENSITY = 60;
const DEFAULT_INTENSITY = 5;
const DEFAULT_FPS = 30;

class Sun {
  constructor(radius, opts = {}) {
    this.radius = radius ?? DEFAULT_RADIUS;
    this.color = opts.color ?? DEFAULT_COLOR;
    this.rOffset = opts.offset?.right ?? DEFAULT_RIGHT_OFFSET;
    this.tOffset = opts.offset?.top ?? DEFAULT_TOP_OFFSET;

    this.stageWidth = 0;
    this.stageHeight = 0;
    this.x = 0;
    this.y = 0;

    this.time = 0;
    this.fpsTime = 1000 / (opts.FPS ?? DEFAULT_FPS);

    const density = opts.density ?? DEFUALT_DENSITY;
    this.intensity = opts.intensity ?? DEFAULT_INTENSITY;
    this.orginPos = Array.from({ length: density }, () => new Point());
    this.pos = Array.from({ length: density }, () => new Point());

    for (let i = 0; i < density; i += 1) {
      const point = Point.getCirclePoint(this.radius, i / density);
      this.orginPos[i].moveTo(point.x, point.y);
      this.pos[i].moveTo(point.x, point.y);
    }
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius - this.rOffset;
    this.y = this.radius + this.tOffset;
  }

  draw(ctx, t) {
    if (t - this.time > this.fpsTime) {
      this.time = t;
      this.updatePoints();
    }

    const start = this.pos[0];

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);

    this.pos.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.fill();
  }

  updatePoints() {
    this.orginPos.forEach((point, i) => {
      const x = point.x + Math.random() * this.intensity;
      const y = point.y + Math.random() * this.intensity;
      this.pos[i].moveTo(x + this.x, y + this.y);
    });
  }
}

export default Sun;
