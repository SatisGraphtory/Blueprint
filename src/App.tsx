import styled from "@emotion/styled";
import AppBar from "usage/components/AppBar";
import BlueprintManager from "lib/components/BlueprintManager";
import React from 'react';
import './App.css';

const Root = styled.div({
  height: "100%",
  minHeight: "100%",
})

const Wrapper = styled.div({
  height: "100%",
  minHeight: "100%",
})

function App() {
  return (
    <Root>
      <Wrapper >
        <BlueprintManager />
        <AppBar />
      </Wrapper>
    </Root>
  );
}

export default App;
