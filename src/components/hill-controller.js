import Hill from './hill.js';

/**
 * @description Hill Option
 * @typedef {object} Option
 * @property {string} color 색상
 * @property {number} speed 애니메이션 속도
 * @property {number} total 화면 수직 분할 축 개수 (언덕 봉우리 개수)
 */

const DEFAULT_VERTICAL_LAYER_CNT = 8;
const DEFAULT_COLOR = '#000000';
const DEFAULT_SPEED = 1.0;
const DEFAULT_TOTAL = 6;

class HillController {
  /**
   * @param {number} verticalLayerCnt 화면 수평 분할 축 개수 (높이의 다양성)
   * @param {Option[]} items 초기화할 Hill 특성
   */
  constructor(verticalLayerCnt = DEFAULT_VERTICAL_LAYER_CNT, items = []) {
    this.verticalLayerCnt = verticalLayerCnt;
    this.items = items.map((item) => {
      const color = item.color ?? DEFAULT_COLOR;
      const speed = item.speed ?? DEFAULT_SPEED;
      const total = item.total ?? DEFAULT_TOTAL;

      return new Hill(color, speed, verticalLayerCnt, total);
    });

    this.stageWidth = 0;
    this.stageHeight = 0;
  }

  /**
   * @param {number} stageWidth 변경된 화면 가로 크기
   * @param {number} stageHeight 변경된 화면 세로 크기
   */
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.items.forEach((item) => item.resize(stageWidth, stageHeight));
  }

  /**
   * @param {string} color 색상
   * @param {number} speed 애니메이션 속도
   * @param {number} total 화면 수직 분할 축 개수 (언덕 봉우리 개수)
   */
  addHill(color = DEFAULT_COLOR, speed = DEFAULT_SPEED, total = DEFAULT_TOTAL) {
    const hill = new Hill(color, speed, total);
    hill.resize(this.stageWidth, this.stageHeight);
    this.items[this.items.length] = hill;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    return this.items.map((item) => item.draw(ctx));
  }
}

export default HillController;
