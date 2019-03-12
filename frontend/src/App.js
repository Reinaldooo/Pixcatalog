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
import Login from './statefull/Login/Login';
import Register from './statefull/Register/Register';
import Upload from './statefull/Upload';
import ImagesGrid from './stateless/ImagesGrid';

const Main = styled.div`
  display: flex;
  height: calc(100vh - 8rem);
  width: 100%;
  @media (max-width: 1100px) {
    flex-direction: column;
    margin: 4rem auto 6rem;
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
    sessionStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  const logOutUser = () => {    
    sessionStorage.removeItem('user')
    axios('/logout')
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          setUser(false)
        }
      })
  }

  useEffect(() => {
    let localUser = JSON.parse(sessionStorage.getItem('user'))
    if (localUser) {
      setUser(localUser)
    } else {
      axios('/api/check_credentials')
        .then(({ data }) => {
          if (!data.error) {
            sessionStorage.setItem('user', JSON.stringify(data))
            setUser(data)
          }
        });
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
          <Route exact path='/login' render={(props) => <Login {...props} logInUser={logInUser} />} />
          <Route exact path='/upload' render={(props) => <Upload {...props} user={localUser} />}/>
          <Route exact path='/register' render={(props) => <Register {...props}/>} />
          <Route exact path='/myphotos' render={(props) => <MyPhotos {...props} user={localUser} />}/>
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
