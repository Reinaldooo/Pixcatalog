import React, { Component } from 'react';
import NavBar from './stateless/NavBar';
import UserInteraction from './stateless/UserInteraction';
import ImagesGrid from './stateless/ImagesGrid';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  width: 100%;
`

class App extends Component {
  render() {
    return (
      <div className="app">
        <NavBar/>
        <Main>
          <ImagesGrid/>
          <UserInteraction/>
        </Main>
      </div>
    );
  }
}

export default App;
