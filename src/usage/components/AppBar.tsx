import {css} from '@emotion/css'
import styled from "@emotion/styled";
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestoreIcon from '@mui/icons-material/Restore';
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import { prepareForNewCanvas, switchToOtherCanvas } from 'lib/redux/state/blueprintState';
import React from "react";
import {useDispatch} from "react-redux";
import {v4} from "uuid";

const Root = styled.div({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  zIndex: 100
})

const derpCss = css`
          border-radius: 5px;
          pointer-events: auto;
          width: 500px;
          background-color: #424242;
        `;

const AppBar = () => {
  const dispatch = useDispatch();

  return (
    <Root>
      <Paper>
      <BottomNavigation
        value={3}
        onChange={(event, newValue) => {
          const newCanvas = v4();
          dispatch(prepareForNewCanvas({id: newCanvas}))

          setTimeout(() => {
            dispatch(switchToOtherCanvas({id: newCanvas}))
          }, 4000)
          // setValue(newValue);
        }}
        showLabels
        className={derpCss}
      >
        <BottomNavigationAction onClick={() => {}} label="Add Sheet" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        {/*<BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />*/}
      </BottomNavigation>
      </Paper>
    </Root>
  );
}

export default AppBar;