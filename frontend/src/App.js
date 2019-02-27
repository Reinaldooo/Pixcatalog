import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//
import NavBar from './stateless/NavBar';
import UserInteraction from './stateless/UserInteraction';
import ImagesGrid from './stateless/ImagesGrid';
import CategoriesPage from './stateless/CategoriesPage';
import CategoryImages from './stateless/CategoryImages';
import MyPhotos from './stateless/MyPhotos';
import ImageDetail from './stateless/ImageDetail';
import Login from './stateless/Login';
import Upload from './stateless/Upload';
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
    console.log(user)
    this.setState({ user })
  }

  logOutUser = () => {
    fetch('/gdisconnect')
    // .then(res => res.json())
    .then(res => {
      console.log(res)
      if(res.status === 200) {
        this.setState({ user: false })
      }
    })
  }

  componentDidMount() {
    fetch('/api/check_credentials')
    .then(res => res.json())
    .then(res => this.setState({ user: res }))
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
              <Route exact path='/upload' render={(props) => <Upload {...props} user={this.state.user} />} />
              <Route exact path='/register' render={(props) => <Login {...props} logInUser={this.logInUser} />} />
              <Route exact path='/myphotos' render={(props) => <MyPhotos {...props} user={this.state.user} />} />
              <Route exact path='/categories/:category' render={(props) => <CategoryImages {...props} user={this.state.user} />} />
              <Route exact path='/images/:image' render={(props) => <ImageDetail {...props} user={this.state.user} />} />
              {/* 404 pages */}
              {/* <Route render={() => <ErrorPage/>}/> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
