import LinkedList from '../utils/data-structure/linked-list.js';
import Sheep from './sheep.js';

/**
 * @description 양의 위치 미세 조정 값
 * @typedef {object} Offset
 * @property {number} top 위쪽 여백
 * @property {number} right 오른쪽 여백
 * @property {number} bottom 아래쪽 여백
 * @property {number} left 왼쪽 여백
 */

/**
 * @description Sheep Option
 * @typedef {object} Option
 * @property {number} fps 초당 프레임 수
 * @property {number} width 가로 크기
 * @property {number} height 세로 크기
 * @property {number} cycle 새로운 양이 등장하는 주기
 * @property {Offset} offset 양의 위치 미세 조정 값
 */

const DEFAULT_FPS = 24;
const DEFAULT_WIDTH = 360;
const DEFAULT_HEIGHT = 380;
const DEFAULT_CYCLE = 200;
const DEFAULT_OFFSET = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

class SheepController {
  /**
   * @param {string} src 이미지 경로
   * @param {number} frame 이미지 프레임 수
   * @param {Option} opts Sheep Option
   */
  constructor(src, frame, opts = {}) {
    this.img = new Image();
    this.img.onload = this.loaded.bind(this);
    this.img.src = src;

    this.frame = frame;
    this.fps = opts.fps ?? DEFAULT_FPS;
    this.imgWitdh = opts.width ?? DEFAULT_WIDTH;
    this.imgHeight = opts.height ?? DEFAULT_HEIGHT;
    this.offset = opts.offset ?? DEFAULT_OFFSET;

    this.items = new LinkedList();
    this.stageWidth = 0;
    this.stageHeight = 0;

    this.cycle = opts.cycle ?? DEFAULT_CYCLE;
    this.curCycle = 0;
    this.isLoaded = false;
  }

  /**
   * @param {number} stageWidth 변경된 화면 가로 크기
   * @param {number} stageHeight 변경된 화면 세로 크기
   */
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  /**
   * @description 이미지 로드가 끝나면 에니메이션을 시작합니다.
   */
  loaded() {
    this.isLoaded = true;
    this.addSheep();
  }

  addSheep() {
    this.items.push(
      new Sheep(
        this.img,
        this.frame,
        this.fps,
        this.imgWitdh,
        this.imgHeight,
        this.offset,
        this.stageWidth,
      ),
    );
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} t 애니메이션 타임
   * @param {Curve[]} curves 양이 위치할 Hill의 곡선 데이터 배열
   */
  draw(ctx, t, curves) {
    if (!this.isLoaded) return;

    this.curCycle = (this.curCycle + 1) % this.cycle;
    if (this.curCycle === 0) this.addSheep();

    // eslint-disable-next-line no-restricted-syntax
    for (const node of this.items.generateNodes()) {
      const sheep = node.value;

      if (sheep.visible) sheep.draw(ctx, t, curves);
      else this.items.deleteNode(node);
    }
  }
}

export default SheepController;
