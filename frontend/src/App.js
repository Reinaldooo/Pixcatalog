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
import { LoggedInRoute, LoggedOutRoute } from './utils/helper';

const Main = styled.div`
  display: flex;
  height: calc(100vh - 6rem);
  width: 100%;
  margin-bottom: 4rem;
  @media (max-width: 1100px) {
    flex-direction: column;
    margin-top: 4rem;
  }
  @media (max-width: 500px) {
    margin-top: 2rem;
  }
`

const App = (props) => {
  const [user, setUser] = useState(false);

  const getUser = () => {
    let localUser = sessionStorage.getItem('user')
    if(localUser !== null) {
      return JSON.parse(localUser)
    }
    return user
  }

  let localUser = getUser()

  const logInUser = (user) => {
    getUserImages(user.user_id)
    setUser(user)
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  const logOutUser = () => {    
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('images')
    axios('/logout')
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          setUser(false)
        }
      })
  }

  useEffect(() => {
    window.token && console.log(window.token)
    let localUser = JSON.parse(sessionStorage.getItem('user'))
    if (localUser) {
      setUser(localUser)
    } else {
      axios('/api/check_credentials')
        .then(({ data }) => {
          if (!data.error) {
            setUser(data)
          }
        });
    }
    return () => {
      sessionStorage.removeItem('images')
    }
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
          <LoggedOutRoute exact path='/login' component={LoginAndRegister} user={localUser} logInUser={logInUser} />
          <LoggedInRoute exact path='/upload' component={Upload} user={localUser}/>
          <LoggedOutRoute exact path='/register' component={LoginAndRegister} user={localUser} logInUser={logInUser} />
          <LoggedInRoute exact path='/myphotos' component={MyPhotos} user={localUser}/>
          <Route exact path='/categories/:category' render={(props) => <CategoryImages {...props} user={localUser} />} />
          <Route exact path='/images/:image' render={(props) => <ImageDetail {...props} user={localUser} />} />
          {/* 404 pages */}
          <Route render={() => <div style={{ "color": 'white', "textAlign": "center" }}>Page not found!</div>}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
