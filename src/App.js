import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//
import NavBar from './stateless/NavBar';
import UserInteraction from './stateless/UserInteraction';
import ImagesGrid from './stateless/ImagesGrid';
import CategoriesPage from './stateless/CategoriesPage';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  width: 100%;
  margin-top: -2%;
`

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <NavBar />
          <Switch>
            <Route
              exact path='/'
              render={() =>
                <Main>
                  <ImagesGrid />
                  <UserInteraction />
                </Main>
              } />
              <Route exact path='/categories' component={CategoriesPage} />
              <Route exact path='/categories/:category' component={NavBar} />
              <Route exact path='/images/:image' component={NavBar} />
              {/* 404 pages */}
              {/* <Route render={() => <ErrorPage/>}/> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
