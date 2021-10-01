import {createSlice} from '@reduxjs/toolkit'
import PIXI, {APP_DEVICE_PIXEL_RATIO} from 'lib/pixi/PixiProvider';
import {Viewport} from 'pixi-viewport';
import {v4} from "uuid";

type CanvasInitProps = {
  height: number,
  width: number,
  ref: any, // todo: Find the right type
}

function createCanvas(props: CanvasInitProps) {
  const {height, width, ref} = props;

  const pixiApplication = new PIXI.Application({
    backgroundAlpha: 0,
    autoDensity: true,
    height: height,
    width: width,
    view: ref,
    resolution: APP_DEVICE_PIXEL_RATIO,
    antialias: true,
  });

  // scaleToWindow? https://github.com/kittykatattack/scaleToWindow

  const renderer = pixiApplication.renderer
  renderer.roundPixels = true;

  renderer.plugins.interaction.interactionFrequency = 5;
  renderer.autoResize = true;

  const viewport = new Viewport({
    screenWidth: width,
    screenHeight: height,
    worldWidth: 20000,
    worldHeight: 20000,
    interaction: renderer.plugins.interaction,
  });

  viewport.drag().pinch().wheel({
    smooth: 5,
  });

  const viewportContainer = new PIXI.Container();

  viewport.addChild(viewportContainer);

  pixiApplication.stage.addChild(viewport);

  return { application: pixiApplication, viewport, renderer, viewportContainer};
}


type InternalUninitializedBlueprintState = {
  id: string
}

type InternalInitializedBlueprintState = InternalUninitializedBlueprintState & {
  application: any,
  viewport: any,
  renderer: any,
  viewportContainer: any
}

type InternalBlueprintState = InternalUninitializedBlueprintState | InternalInitializedBlueprintState

export type BlueprintState = InternalBlueprintState & {
  id: string
}

const defaultBlueprintId = v4();

type BlueprintStoreState = {
  metadata: {
    currentBlueprintId: string,
    currentBlueprintIndex: number,
    blueprintIndexes: Record<string, number>
  },
  blueprints: InternalBlueprintState[]
}

const initialState: BlueprintStoreState = {
  metadata: {
    currentBlueprintId: defaultBlueprintId,
    currentBlueprintIndex: 0,
    blueprintIndexes: {}
  },
  blueprints: [
    {
      id: defaultBlueprintId
    }
  ]
}

const blueprintState = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    createNewCanvas: (state, action) => {
      const id = action.payload.id as string;

      if (state.metadata.blueprintIndexes[id] !== undefined) {
        return;
      }

      const index = state.blueprints.findIndex(element => element.id === id);

      state.blueprints[index] = {id, ...createCanvas((action.payload as CanvasInitProps))};
      state.metadata.blueprintIndexes[id] = index;

      if (!state.metadata.currentBlueprintId) {
        state.metadata.currentBlueprintId = id;
      }
    },
    prepareForNewCanvas: (state, action) => {
      const id = action.payload.id;
      state.blueprints.push({id});

      if (action.payload.setAsCurrent) {
        state.metadata.currentBlueprintId = id;
      }
    },
    switchToOtherCanvas: (state, action) => {
      const canvasToSwitchTo = action.payload.id;
      if (state.metadata.blueprintIndexes[canvasToSwitchTo] !== undefined) {
        state.metadata.currentBlueprintId = canvasToSwitchTo;
      }
    }
  }
})

export const { createNewCanvas, prepareForNewCanvas, switchToOtherCanvas } = blueprintState.actions

export const { type: CREATE_NEW_CANVAS_ACTION } = createNewCanvas;
export const { type: PREPARE_FOR_NEW_CANVAS_ACTION } = prepareForNewCanvas;
export const { type: SWITCH_CANVAS_ACTION } = switchToOtherCanvas;

export const blueprintReducer = blueprintState.reducer;

