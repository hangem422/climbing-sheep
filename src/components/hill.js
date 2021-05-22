import Deque from '../utils/data-structure/deque.js';
import Point from '../utils/quadratic/point.js';
import Curve from '../utils/quadratic/curve.js';

class Hill {
  /**
   * @param {string} color  색상
   * @param {number} speed 속도
   * @param {number} vertical 화면 수평 분할 축 개수 (높이의 다양성)
   * @param {number} horizontal 화면 수직 분할 축 개수 (언덕 봉우리 개수)
   */
  constructor(color, speed, vertical, horizontal) {
    this.color = color;
    this.speed = speed;
    this.vertical = vertical;
    this.horizontal = horizontal;
    this.points = new Deque();

    this.stageWidth = 0;
    this.stageHeight = 0;
    this.gap = 0;
  }

  /**
   * @param {number} stageWidth 변경된 화면 가로 크기
   * @param {number} stageHeight 변경된 화면 세로 크기
   */
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.gap = Math.ceil(this.stageWidth / (this.horizontal - 2));

    this.points.clear();

    for (let i = 0, l = this.horizontal + 2; i < l; i += 1) {
      const x = i * this.gap - this.gap * 2;
      const y = this.getY();
      const point = new Point(x, y);

      this.points.pushBack(point);
    }
  }

  /**
   * @description 화면에서 사라진 언덕을 지우고, 화면에 나타날 언덕을 미리 생성합니다.
   */
  cycle() {
    if (this.points.front.x > -this.gap) {
      const point = this.points.popBack();
      point.moveTo(this.gap * -2, this.getY());
      this.points.pushFront(point);
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @returns {Curve[]} 그려진 곡선 데이터 배열
   */
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    this.cycle();
    const start = this.points.front;
    const end = this.points.back;

    const curves = [];
    let prev = start;
    let prevMid = start;

    start.moveTo(start.x + this.speed);
    ctx.moveTo(start.x, start.y);

    for (const cur of this.points.generateValues(1)) {
      cur.moveTo(cur.x + this.speed);

      const mid = Point.centerOf(prev, cur);
      ctx.quadraticCurveTo(prev.x, prev.y, mid.x, mid.y);

      curves[curves.length] = new Curve(prevMid, prev, mid);
      prev = cur;
      prevMid = mid;
    }

    ctx.lineTo(end.x, end.y);
    ctx.lineTo(end.x, this.stageHeight);
    ctx.lineTo(start.x, this.stageHeight);
    ctx.fill();

    return curves;
  }

  /**
   * @description 언덕의 높이를 랜덤하게 생성합니다.
   * @returns {number}
   */
  getY() {
    const min = this.stageHeight / this.vertical;
    const max = this.stageHeight - min;

    return min + Math.random() * max;
  }
}

export default Hill;
