
import React,{useState} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import './index.css';
import GamePage  from './pages/GamePage.js'
import HomePage  from './pages/HomePage.js'
import HelpPage from './pages/HelpPage.js'

function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path = "/game" component = {GamePage}/>
        <Route path = "/help" component = {HelpPage}/>
        <Route path = "/"     component = {HomePage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;