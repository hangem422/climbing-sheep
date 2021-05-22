import Point from './point.js';

class Curve {
  /**
   * @param {Point} start 곡선 시작 좌표
   * @param {Point} mid 곡선 경유 좌표
   * @param {Point} end 곡선 종료 좌표
   */
  constructor(start, mid, end) {
    this.start = start;
    this.mid = mid;
    this.end = end;
  }

  /**
   * @description 2차 베지어 곡선 함수입니다.
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {number} t
   * @returns {number}
   */
  static bezierCurve(a, b, c, t) {
    return (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t ** 2 * c;
  }

  /**
   * @description 곡선의 순간 변화율(기울기)를 구하기 위한 유도체를 반환합니다.
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @param {number} t
   * @returns {number}
   */
  static derivativeOfCurve(a, b, c, t) {
    return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
  }

  /**
   * @description 곡선의 기울기 각도를 구합니다.
   * @param {number} t 기울기의 위치 값
   * @returns {number} radian
   */
  getRotation(t) {
    const tx = Curve.derivativeOfCurve(this.start.x, this.mid.x, this.end.x, t);
    const ty = Curve.derivativeOfCurve(this.start.y, this.mid.y, this.end.y, t);
    const rotation = (90 * Math.PI) / 180 - Math.atan2(tx, ty);

    return rotation;
  }

  /**
   * @description 곡선 위의 좌표를 구합니다.
   * @param {number} t 좌표의 위치 값
   * @returns {Point}
   */
  getPoint(t) {
    const x = Curve.bezierCurve(this.start.x, this.mid.x, this.end.x, t);
    const y = Curve.bezierCurve(this.start.y, this.mid.y, this.end.y, t);
    const rotation = this.getRotation(t);

    return new Point(x, y, rotation);
  }

  /**
   * @description x값과 대응되는 곡선위의 좌표를 구합니다.
   * @param {number} x
   * @returns {Point}
   */
  getPointFromX(x) {
    if (x < this.start.x || x > this.end.x) return 0;

    const t = (x - this.start.x) / (this.end.x - this.start.x);
    const point = this.getPoint(t);

    return point;
  }
}

export default Curve;
