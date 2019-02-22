import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//
import NavBar from './stateless/NavBar';
import UserInteraction from './stateless/UserInteraction';
import ImagesGrid from './stateless/ImagesGrid';
import CategoriesPage from './stateless/CategoriesPage';
import CategoryImages from './stateless/CategoryImages';
import ImageDetail from './stateless/ImageDetail';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  width: 100%;
  margin-top: -2%;
`

class App extends Component {

  fetcher = () => {
    fetch('/JSON')
    .then(res => res.json())
    .then(res => { console.log(res) })
  }

  render() {
    this.fetcher()
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
              <Route exact path='/categories/:category' component={CategoryImages} />
              <Route exact path='/images/:image' component={ImageDetail} />
              {/* 404 pages */}
              {/* <Route render={() => <ErrorPage/>}/> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
