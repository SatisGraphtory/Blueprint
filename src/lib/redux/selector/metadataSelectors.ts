import {v4} from "uuid";

const defaultBlueprintId = v4();

const BLUEPRINT_NONE = {
  id: null
}

export const getCurrentBlueprint = (state: any) => {
  const currentBlueprintId = state.metadata.currentBlueprintId;

  if (!currentBlueprintId) {
    return BLUEPRINT_NONE;
  }

  const blueprint = state.blueprints[state.metadata.blueprintIndexes[currentBlueprintId]]

  return blueprint ? blueprint : BLUEPRINT_NONE;
}

export const getBlueprintById = (id: string) => (state: any) => {
  const blueprint = state.blueprints[state.metadata.blueprintIndexes[id]];
  return blueprint ? blueprint : BLUEPRINT_NONE;
}

const defaultAllBlueprintList = [{
  id: defaultBlueprintId
}];

export const getAllBlueprints = (state: any) => {
  const currentBlueprintId = state.metadata.currentBlueprintId;

  if (!currentBlueprintId) {
    return defaultAllBlueprintList;
  }

  return state.blueprints;
}