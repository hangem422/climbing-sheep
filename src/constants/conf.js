export const appConf = {
  RESOLUTION: 2,
};

export const hillConf = {
  VERTICAL_LAYER_CNT: 8,
  ITEMS: [
    {
      color: '#fd6bea',
      speed: 0.2,
      total: 12,
    },
    {
      color: '#ff59c2',
      speed: 0.5,
      total: 8,
    },
    {
      color: '#ff4674',
      speed: 1.4,
      total: 6,
    },
  ],
};

export const sheepConf = {
  FRAME: 8,
  FPS: 24,
  CYCLE: 200,
  WIDTH: 180,
  HEIGHT: 150,
  OFFSET: {
    top: 0,
    right: 0,
    bottom: 55,
    left: 0,
  },
};

export const sunConf = {
  RADIUS: 200,
  COLOR: '#ffb200',
  OFFSET: { right: 140, top: 100 },
  DENSITY: 60,
  INTENSITY: 5,
  FPS: 30,
};

const deepFreeze = (target) => {
  if (target && typeof target === 'object') {
    if (!Object.isFrozen(target)) Object.freeze(target);
    Object.values(target).forEach((value) => deepFreeze(value));
  }
};

[appConf, hillConf, sheepConf, sunConf].forEach(deepFreeze);
