import Curve from '../utils/quadratic/curve.js';
import Point from '../utils/quadratic/point.js';

/**
 * @description 양의 위치 미세 조정 값
 * @typedef {object} Offset
 * @property {number} top 위쪽 여백
 * @property {number} right 오른쪽 여백
 * @property {number} bottom 아래쪽 여백
 * @property {number} left 왼쪽 여백
 */

class Sheep {
  /**
   * @param {HTMLImageElement} img 양 이미지 Element
   * @param {number} frame 이미지 프레임 수
   * @param {number} fps 초당 프레임 수
   * @param {number} width 가로 크기
   * @param {number} height 세로 크기
   * @param {Offset} offset 양의 위치 미세 조정 값
   * @param {number} stageWidth 변경된 화면 가로 크기
   */
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

  /**
   * @description 양이 현재 화면에서 보이고 있는지 여부를 반환합니다.
   * @returns {boolean}
   */
  get visible() {
    return this.point.x > -this.width;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} t 애니메이션 타임
   * @param {Curve[]} curves 양이 위치할 Hill의 곡선 데이터 배열
   */
  draw(ctx, t, curves) {
    this.point.x -= this.speed;
    const curve = this.getCurrentCurve(curves);
    if (curve) this.point = curve.getPointFromX(this.point.x);

    if (t - this.time > this.fpsTime) {
      this.time = t;
      this.curFrame = (this.curFrame + 1) % this.totalFrame;
    }

    this.animate(ctx, curves);
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
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

  /**
   * @description 현재 양이 위치한 곡선 데이터를 반환합니다.
   * @param {Curve[]} curves 양이 위치할 Hill의 곡선 데이터 배열
   * @returns {Curve | null} 존재하지 않으면 null을 반환합니다.
   */
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
