class Point {
  /**
   * @param {number} x 좌표의 x값
   * @param {number} y 좌표의 y값
   * @param {number} rotation 좌표의 기울기 각도
   */
  constructor(x = 0, y = 0, rotation = 0) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  /**
   * @description 두 좌표의 중심 좌표를 반환합니다.
   * @param {Point} p1
   * @param {Point} p2
   * @returns {Point}
   */
  static centerOf(p1, p2) {
    const x = (p1.x + p2.x) / 2;
    const y = (p1.y + p2.y) / 2;

    return new Point(x, y);
  }

  /**
   * @description 원 위의 좌표 값을 반환합니다.
   * @param {number} radius 원의 반지름
   * @param {number} t 좌표의 위치 값
   * @returns {Point}
   */
  static getCirclePoint(radius, t) {
    const radian = 360 * t * (Math.PI / 180);
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    return new Point(x, y);
  }

  /**
   * @description 좌표를 이동시킵니다.
   * @param {number} x
   * @param {number} y
   */
  moveTo(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
  }
}

export default Point;
