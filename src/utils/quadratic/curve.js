import Point from './point.js';
import * as quad from './quad-math.js';

class Curve {
  constructor(start, mid, end) {
    this.start = start;
    this.mid = mid;
    this.end = end;
  }

  getRotation(t) {
    const tx = quad.derivativeOfCurve(this.start.x, this.mid.x, this.end.x, t);
    const ty = quad.derivativeOfCurve(this.start.y, this.mid.y, this.end.y, t);
    const rotation = (90 * Math.PI) / 180 - Math.atan2(tx, ty);

    return rotation;
  }

  getPoint(t) {
    const x = quad.bezierCurve(this.start.x, this.mid.x, this.end.x, t);
    const y = quad.bezierCurve(this.start.y, this.mid.y, this.end.y, t);
    const rotation = this.getRotation(t);

    return new Point(x, y, rotation);
  }

  getPoointFronX(x) {
    if (x < this.start.x || x > this.end.x) return 0;

    const t = (x - this.start.x) / (this.end.x - this.start.x);
    const point = this.getPoint(t);

    return point;
  }
}

export default Curve;
