const DEFAULT_RADIUS = 200;
const DEFAULT_COLOR = '#ffb200';
const DEFAULT_RIGHT_OFFSET = 0;
const DEFAULT_TOP_OFFSET = 0;

class Sun {
  constructor(radius, opts = {}) {
    this.radius = radius ?? DEFAULT_RADIUS;
    this.color = opts.color ?? DEFAULT_COLOR;
    this.rOffset = opts.offset?.right ?? DEFAULT_RIGHT_OFFSET;
    this.tOffset = opts.offset?.top ?? DEFAULT_TOP_OFFSET;

    this.stageWidth = 0;
    this.stageHeight = 0;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius - this.rOffset;
    this.y = this.radius + this.tOffset;
  }

  draw(ctx, t) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

export default Sun;
