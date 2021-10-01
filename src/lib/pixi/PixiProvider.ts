import * as PIXIMain from 'pixi.js';
import * as PIXILegacy from 'pixi.js-legacy';
import { PRECISION } from '@pixi/constants';

const urlParams = new URLSearchParams(window.location.search);

let PIXI;

if (urlParams.get('useCanvas') || !PIXIMain.utils.isWebGLSupported()) {
  console.log('Using Canvas Pixi');
  PIXI = PIXILegacy;
} else {
  console.log('Using WebGL Pixi');
  PIXI = PIXIMain;
}

PIXI.settings.PRECISION_FRAGMENT = PRECISION.HIGH;

PIXI.utils.skipHello();

(window as any).PIXI = PIXI;
(global as any).PIXI = PIXI;

export const APP_DEVICE_PIXEL_RATIO = 2 * Math.ceil(((window.devicePixelRatio || 1) + 1) / 2);

export default PIXI as any;
