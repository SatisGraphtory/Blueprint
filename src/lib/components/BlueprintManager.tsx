import styled from "@emotion/styled";
import Blueprint from "lib/components/Blueprint";
import {getAllBlueprints, getCurrentBlueprint} from "lib/redux/selector/metadataSelectors";
import {BlueprintState} from "lib/redux/state/blueprintState";
import React from "react";
import {useSelector} from "react-redux";
import {withResizeDetector} from 'react-resize-detector';

const Root = styled.div({
  height: "100%",
  width: "100%",
})

type BlueprintManagerProps = {
  width: number,
  height: number,
  targetRef?: React.MutableRefObject<any>
}

const BlueprintManagerBase = ({width, height, targetRef }: BlueprintManagerProps) => {
  const currentBlueprint = useSelector(getCurrentBlueprint);
  const allBlueprints = useSelector(getAllBlueprints);

  const currentBlueprintId = currentBlueprint.id || allBlueprints[0].id

  return <Root ref={targetRef}>
    {
      allBlueprints.map((blueprint: BlueprintState) =>
        <Blueprint active={currentBlueprintId === blueprint.id} id={blueprint.id} key={blueprint.id} height={height} width={width} />)
    }
  </Root>
}

const BlueprintManager = withResizeDetector(React.memo(BlueprintManagerBase), {
  refreshMode: 'throttle',
  refreshRate: 100,
  refreshOptions: {leading: true, trailing: true}
});

BlueprintManager.whyDidYouRender = {
  customName: 'BlueprintManager'
}

export default BlueprintManager;