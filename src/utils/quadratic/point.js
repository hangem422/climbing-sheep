class Point {
  constructor(x = 0, y = 0, rotation = 0) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }

  static centerOf(p1, p2) {
    const x = (p1.x + p2.x) / 2;
    const y = (p1.y + p2.y) / 2;

    return new Point(x, y);
  }

  moveTo(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
  }
}

export default Point;
