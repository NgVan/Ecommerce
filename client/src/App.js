import React from 'react';
//import ReactDOM from 'react-dom'
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import axios from 'axios'

import Header from "./component/Header"
import Dashboard from "./component/Dashboard"
import Error from "./component/ErrorPage"
import Home from "./component/Home"
import SignIn from "./component/SignIn"
import SignUp from "./component/SignUp"
//import SignOut from "./component/SignOut"
import reducers from './reducers';

import authGuard from './component/HOCs/authGuard'



const App = () => {
  const jwtToken = localStorage.getItem("JWT_TOKEN")
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT_TOKEN")}`

  return(
    
    // Step 2:  Init your store with the reducer
    <Provider store = {createStore(reducers, {
      auth : {
        token : jwtToken,
        isAuthenticated : jwtToken ? true: false
      }
    }, applyMiddleware(reduxThunk))}>
      <BrowserRouter>
        <Header/>
        <div className = "container">
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/Dashboard' component={authGuard(Dashboard)}></Route>
            <Route exact path='/Signin' component={SignIn}></Route>
            <Route exact path='/signup' component={SignUp}></Route>
          
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
    
  )
}

export default App;
