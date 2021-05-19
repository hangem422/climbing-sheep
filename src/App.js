import { appConf, hillConf, sheepConf, sunConf } from './constants/conf.js';
import { SHEEP_IMG } from './constants/path.js';

import HillController from './components/hill-controller.js';
import SheepController from './components/sheep-controller.js';
import Sun from './components/sun.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.sun = new Sun(sunConf.RADIUS, {
      color: sunConf.COLOR,
      offset: sunConf.OFFSET,
    });

    this.hillController = new HillController(
      hillConf.VERTICAL_LAYER_CNT,
      hillConf.ITEMS,
    );

    this.sheepController = new SheepController(SHEEP_IMG, sheepConf.FRAME, {
      fps: sheepConf.FPS,
      cycle: sheepConf.CYCLE,
      width: sheepConf.WIDTH,
      height: sheepConf.HEIGHT,
      offset: sheepConf.OFFSET,
    });

    this.stageWidth = 0;
    this.stageHeight = 0;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
  }

  get element() {
    return this.canvas;
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * appConf.RESOLUTION;
    this.canvas.height = this.stageHeight * appConf.RESOLUTION;
    this.ctx.scale(appConf.RESOLUTION, appConf.RESOLUTION);

    this.sun.resize(this.stageWidth, this.stageHeight);
    this.hillController.resize(this.stageWidth, this.stageHeight);
    this.sheepController.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.sun.draw(this.ctx, t);
    const curves = this.hillController.draw(this.ctx);
    this.sheepController.draw(this.ctx, t, curves[curves.length - 1]);
  }
}

export default App;
