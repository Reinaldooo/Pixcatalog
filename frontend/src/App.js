import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//
import NavBar from './stateless/NavBar';
import UserInteraction from './stateless/UserInteraction';
import ImagesGrid from './stateless/ImagesGrid';
import CategoriesPage from './stateless/CategoriesPage';
import CategoryImages from './stateless/CategoryImages';
import ImageDetail from './stateless/ImageDetail';
import Login from './stateless/Login';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  width: 100%;
  margin-top: -2%;
`

class App extends Component {
  state = {
    user: false,
    categories: []
  }

  logInUser = (user) => {
    this.setState({ user })
  }

  logOutUser = () => {
    this.setState({ user: false })
  }


  render() {
    return (
      <Router>
        <div className="app">
          <NavBar user={this.state.user} logInUser={this.logInUser} logOutUser={this.logOutUser}/>
          <Switch>
            <Route
              exact path='/'
              render={() =>
                <Main>
                  <ImagesGrid />
                  <UserInteraction categories={this.state.categories}/>
                </Main>
              } />
              <Route exact path='/categories' component={CategoriesPage} />
              <Route exact path='/login' render={(props) => <Login {...props} logInUser={this.logInUser} />} />
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
