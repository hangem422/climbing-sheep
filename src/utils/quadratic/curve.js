import Point from './point.js';

class Curve {
  constructor(start, mid, end) {
    this.start = start;
    this.mid = mid;
    this.end = end;
  }

  static bezierCurve(a, b, c, t) {
    return (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t ** 2 * c;
  }

  static derivativeOfCurve(a, b, c, t) {
    return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
  }

  getRotation(t) {
    const tx = Curve.derivativeOfCurve(this.start.x, this.mid.x, this.end.x, t);
    const ty = Curve.derivativeOfCurve(this.start.y, this.mid.y, this.end.y, t);
    const rotation = (90 * Math.PI) / 180 - Math.atan2(tx, ty);

    return rotation;
  }

  getPoint(t) {
    const x = Curve.bezierCurve(this.start.x, this.mid.x, this.end.x, t);
    const y = Curve.bezierCurve(this.start.y, this.mid.y, this.end.y, t);
    const rotation = this.getRotation(t);

    return new Point(x, y, rotation);
  }

  getPointFromX(x) {
    if (x < this.start.x || x > this.end.x) return 0;

    const t = (x - this.start.x) / (this.end.x - this.start.x);
    const point = this.getPoint(t);

    return point;
  }
}

export default Curve;
