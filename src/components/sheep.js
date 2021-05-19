import Point from '../utils/quadratic/point.js';

class Sheep {
  constructor(img, frame, fps, width, height, offset, stageWidth) {
    this.img = img;

    this.totalFrame = frame;
    this.curFrame = 0;

    this.width = width;
    this.height = height;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    this.swidth = this.img.width / this.totalFrame;
    this.sheight = this.img.height;

    this.tOffeset = offset.top ?? 0;
    this.rOffeset = offset.right ?? 0;
    this.bOffeset = offset.bottom ?? 0;
    this.lOffeset = offset.left ?? 0;

    this.point = new Point(stageWidth + this.width, 0);
    this.speed = Math.random() * 2 + 1;

    this.time = 0;
    this.fpsTime = 1000 / fps;
  }

  get visible() {
    return this.point.x > -this.width;
  }

  draw(ctx, t, curves) {
    this.point.x -= this.speed;
    const curve = this.getCurrentCurve(curves);
    if (curve) this.point = curve.getPoointFronX(this.point.x);

    if (t - this.time > this.fpsTime) {
      this.time = t;
      this.curFrame = (this.curFrame + 1) % this.totalFrame;
    }

    this.animate(ctx, curves);
  }

  animate(ctx) {
    ctx.save();

    ctx.translate(this.point.x, this.point.y);
    ctx.rotate(this.point.rotation);
    ctx.drawImage(
      this.img,
      this.swidth * this.curFrame,
      0,
      this.swidth,
      this.sheight,
      -this.halfWidth + this.lOffeset - this.rOffeset,
      -this.halfHeight + this.tOffeset - this.bOffeset,
      this.width,
      this.height,
    );

    ctx.restore();
  }

  getCurrentCurve(curves) {
    let left = 0;
    let right = curves.length - 1;

    while (left <= right) {
      const mid = Math.ceil((left + right) / 2);

      if (this.point.x < curves[mid].start.x) right = mid - 1;
      else if (this.point.x > curves[mid].end.x) left = mid + 1;
      else return curves[mid];
    }

    return null;
  }
}

export default Sheep;
