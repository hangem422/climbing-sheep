import Point from '../utils/quadratic/point.js';

/**
 * @description 태양의 위치 미세 조정 값
 * @typedef {object} Offset
 * @property {number} top 위쪽 여백
 * @property {number} right 오른쪽 여백
 */

/**
 * @description Sun Option
 * @typedef {object} Option
 * @property {string} color 색상
 * @property {Offset} offset 태양의 위치 미세 조정 값
 * @property {number} density 에니메이션 밀도
 * @property {number} intensity 에니메이션 강도
 * @property {number} fps 초당 프래임 개수
 */

const DEFAULT_RADIUS = 200;
const DEFAULT_COLOR = '#ffb200';
const DEFAULT_RIGHT_OFFSET = 0;
const DEFAULT_TOP_OFFSET = 0;

const DEFUALT_DENSITY = 60;
const DEFAULT_INTENSITY = 5;
const DEFAULT_FPS = 30;

class Sun {
  /**
   * @param {number} radius 반지름
   * @param {Option} opts Sun Option
   */
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

  /**
   * @param {number} stageWidth 변경된 화면 가로 크기
   * @param {number} stageHeight 변경된 화면 세로 크기
   */
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius - this.rOffset;
    this.y = this.radius + this.tOffset;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} t 애니메이션 타임
   */
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

  /**
   * @description 태양을 이루는 각 점들을 랜덤한 위치로 이동시킵니다.
   */
  updatePoints() {
    this.orginPos.forEach((point, i) => {
      const x = point.x + Math.random() * this.intensity;
      const y = point.y + Math.random() * this.intensity;
      this.pos[i].moveTo(x + this.x, y + this.y);
    });
  }
}

export default Sun;
