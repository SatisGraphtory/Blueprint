import styled from "@emotion/styled";
import {shallowEqual} from 'fast-equals';
import PIXI from "lib/pixi/PixiProvider";
import {getBlueprintById} from "lib/redux/selector/metadataSelectors";
import {createNewCanvas} from "lib/redux/state/blueprintState";
import {useHookWithRefCallback} from "lib/util/hooks";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

interface BlueprintProps {
  id: string;
  height: number | undefined,
  width: number | undefined
  active: boolean
}

type CanvasProps = {
  active: boolean
}

const Canvas = styled.canvas<CanvasProps>(props => {
  if (props.active) {
    return {
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      userSelect: 'none',
    }
  }

  return {
    display: 'none'
  }
});


const Blueprint = ({id, height, width, active}: BlueprintProps) => {
  const {current: canvas, ref: canvasRef} = useHookWithRefCallback<HTMLCanvasElement>()

  const {id: blueprintId, renderer, viewport, viewportContainer} = useSelector(getBlueprintById(id));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!renderer && canvas && height && width) {
      dispatch(createNewCanvas({
        id,
        height,
        width,
        ref: canvas,
      }));
    }
  }, [canvas, blueprintId, dispatch, height, id, width, renderer])

  useEffect(() => {
    if (renderer && width && height) {
      renderer.resize(width, height);
      renderer.resize(width, height);

      const originPoint = viewport.toWorld(0, 0);
      const maxPoint = viewport.toWorld(width, height);

      // We need to update the hitArea after we resize.
      viewportContainer.hitArea = new PIXI.Rectangle(
        originPoint.x,
        originPoint.y,
        maxPoint.x - originPoint.x,
        maxPoint.y - originPoint.y
      );
    }

  }, [renderer, height, width, viewport, viewportContainer])

  return <Canvas active={active} ref={canvasRef} />
}

Blueprint.whyDidYouRender = {
  customName: 'Blueprint'
}

export default React.memo(Blueprint, (prevProps, newProps) => {
  if (!prevProps.active && !newProps.active) {
    return true;
  }

  return shallowEqual(prevProps, newProps);
});