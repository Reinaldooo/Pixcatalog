import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//
import NavBar from './statefull/NavBar';
import UserInteraction from './statefull/UserInteraction';
import CategoriesPage from './statefull/CategoriesPage';
import CategoryImages from './statefull/CategoryImages';
import MyPhotos from './statefull/MyPhotos';
import ImageDetail from './statefull/ImageDetail';
import LoginAndRegister from './statefull/LoginAndRegister';
import Upload from './statefull/Upload';
import ImagesGrid from './stateless/ImagesGrid';

const Main = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  width: 100%;
  margin-top: -2%;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const App = (props) => {
  const [user, setUser] = useState(false);

  const logInUser = (user) => {
    setUser(user)
  }

  const logOutUser = () => {
    axios('/logout')
      .then(res => {
        if (res.status === 200) {
          setUser(false)
        }
      })
  }

  useEffect(() => {
    axios('/api/check_credentials')
    .then(res => {
      setUser(res.data)
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <NavBar user={user} logInUser={logInUser} logOutUser={logOutUser} />
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
          <Route exact path='/login' render={(props) => <LoginAndRegister {...props} logInUser={logInUser} />} />
          <Route exact path='/upload' render={(props) => <Upload {...props} user={user} />} />
          <Route exact path='/register' render={(props) => <LoginAndRegister {...props} logInUser={logInUser} />} />
          <Route exact path='/myphotos' render={(props) => <MyPhotos {...props} user={user} />} />
          <Route exact path='/categories/:category' render={(props) => <CategoryImages {...props} user={user} />} />
          <Route exact path='/images/:image' render={(props) => <ImageDetail {...props} user={user} />} />
          {/* 404 pages */}
          {/* <Route render={() => <ErrorPage/>}/> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
