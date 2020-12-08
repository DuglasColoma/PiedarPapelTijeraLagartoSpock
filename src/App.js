
import React,{useState} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import './index.css';
import GamePage  from './pages/GamePage.js'
import HomePage  from './pages/HomePage.js'
import ErrorPage from './pages/ErrorPage.js'

function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path = "/game" component = {GamePage }/>
        <Route path = "/"     component = {HomePage }/>
        <Route path = "*"     component = {ErrorPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;